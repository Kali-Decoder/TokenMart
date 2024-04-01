// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {LoyalityToken} from "./LoyalityToken.sol";
import {MintableToken} from "./BrandToken.sol";

contract EcommerceBrandTokenReward {
    address public owner;
    LoyalityToken private rewardToken;
    mapping(uint256 => Brand) private brands;
    mapping(address => mapping(uint256 => uint256)) private brandTokens;
    mapping(address => mapping(uint256 => uint256)) public brandBalance;
    mapping(string => bool) public isBrand;
    mapping(address => bool) public isUser;
    mapping(address => bool) public isBrandAdmin;
    mapping(address => User) private users;
    mapping(address => mapping(address => bool)) private brandOwnerToBrand;
    mapping(address => Referral) public referrals;
    mapping(address => address[]) public referrersToListOfReferees;

    event Referred(address indexed referrer, address indexed referee);
    event Accepted(address indexed referee, uint256 reward);

    struct Product {
        uint256 productID;
        uint256 timestamp;
        uint256 brandID;
    }

    struct User {
        uint256 id;
        uint256 totalEtherSpent;
        uint256 totalTokenRewards;
        uint256 numberOfRefferrels;
        uint256 totalLoyalityTokenBalance;
        uint256 totalBalance;
        Product[] products;
    }

    struct Referral {
        address referrer;
        bool hasAccepted;
        uint256 reward;
    }

    struct Brand {
        uint256 id;
        string name;
        string symbol;
        uint256 tokenPercentage;
        address brandAddress;
        address brandOwner;
        uint256 basePrice;
    }

    uint256 public brandID;
    uint256 public userID;

    event Purchase(address indexed user, uint256 brandid, uint256 amount);
    event ReceivedReward(address indexed user, uint256 brandid, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    modifier onlyBrandAdmin() {
        require(
            isBrandAdmin[msg.sender],
            "Only Brand owner can call this function"
        );
        _;
    }

    modifier onlyUser(address _referee) {
        require(isUser[msg.sender] && isUser[_referee], "Not a User");
        _;
    }

    constructor(address _loyalityTokenAddress) {
        owner = msg.sender;
        rewardToken = LoyalityToken(_loyalityTokenAddress);
        rewardToken.mint(address(this), 1000000);
    }

    /**
        * @dev function to register a new brand
        * @param _brandName name of the brand
        * @param _brandSymbol symbol of the brand
        * @param _tokenPercentage percentage of token reward
        * @param _basePrice base price of the brand
        
     */
    function registerBrand(
        string memory _brandName,
        string memory _brandSymbol,
        uint256 _tokenPercentage,
        uint256 _basePrice
    ) public onlyOwner  {
        require(!isBrand[_brandName], "Your Brand Already Exist !!!");
        MintableToken mintableAddress = new MintableToken(
            _brandName,
            _brandSymbol
        );
        mintableAddress.mint(address(this), 10000);
        brandID = brandID + 1;
        brands[brandID] = Brand(
            brandID,
            _brandName,
            _brandSymbol,
            _tokenPercentage,
            address(mintableAddress),
            msg.sender,
            _basePrice
        );
        brandOwnerToBrand[msg.sender][address(mintableAddress)] = true;
        isBrandAdmin[msg.sender] = true;
        isBrand[_brandName] = true;
    }

    /**
     * @dev function to change the base price of the brand
     * @param _baseAmount new base price of the brand
     * @param _brandId id of the brand
     */

    function changeBasePrice(uint256 _baseAmount, uint256 _brandId)
        public
        onlyBrandAdmin
    {
        brands[_brandId].basePrice = _baseAmount;
    }

    /**
     * @dev function to change the percentage of token reward
     * @param _basePercentage new percentage of token reward
     * @param _brandId id of the brand
     */

    function changePercentage(uint256 _basePercentage, uint256 _brandId)
        public
        onlyBrandAdmin
    {
        brands[_brandId].tokenPercentage = _basePercentage;
    }

    /**
     * @dev function to purchase the brand token
     */

    function registerUser() public returns (bool) {
        require(msg.sender != address(0), "Provide Valid Address");
        require(!isUser[msg.sender], "Already Exist User");
        userID = userID + 1;
        users[msg.sender].id = userID;
        users[msg.sender].totalEtherSpent = 0;
        users[msg.sender].totalTokenRewards = 0;
        users[msg.sender].numberOfRefferrels = 0;
        users[msg.sender].totalBalance = 0;
        require(
            (rewardToken).transfer(msg.sender, 10*(10**18)),
            "Transfer Failed"
        );
        users[msg.sender].totalLoyalityTokenBalance += 10;
        isUser[msg.sender] = true;

        return true;
    }

    /**
     * @dev function to loyality claim tokens
     * @param loyalityTokenAddress amount
     */

    function claimLoyalityTokens(address loyalityTokenAddress) public {
        require(
            users[msg.sender].totalLoyalityTokenBalance > 0,
            "No Loyality Tokens Are There"
        );
        uint256 balanceIncreased = users[msg.sender].totalLoyalityTokenBalance *
            2;
        
        LoyalityToken(loyalityTokenAddress).burn(
            users[msg.sender].totalLoyalityTokenBalance
        );
        users[msg.sender].totalBalance += balanceIncreased;
        users[msg.sender].totalLoyalityTokenBalance = 0;
    }

    /**
     * @dev function to purchase the brand token
     * @param _brandId id of the brand
     * @param brandTokenAddress for transfer tokens
     * @return bool
     */

    function claimBrandTokens(address brandTokenAddress, uint256 _brandId)
        public
        returns (bool)
    {
        require(
            brandTokens[msg.sender][_brandId] > 0,
            "No Brnad Tokens Are There"
        );
        uint256 balanceIncreased = brandTokens[msg.sender][_brandId];
        brandBalance[msg.sender][_brandId] += balanceIncreased;
        MintableToken(brandTokenAddress).burn(balanceIncreased);
        brandTokens[msg.sender][_brandId] = 0;
        users[msg.sender].totalBalance += balanceIncreased;
        return true;
    }

    function refer(address _referee) external onlyUser(_referee) {
        require(_referee != msg.sender, "Cannot refer oneself");
        require(referrals[_referee].referrer == address(0), "Already referred");
        referrals[_referee] = Referral({
            referrer: msg.sender,
            hasAccepted: false,
            reward: 0
        });

        referrersToListOfReferees[msg.sender].push(_referee);

        emit Referred(msg.sender, _referee);
    }

    function acceptReferral() external {
        require(
            referrals[msg.sender].referrer != address(0),
            "Not referred by anyone"
        );
        require(
            !referrals[msg.sender].hasAccepted,
            "Already accepted referral"
        );
        referrals[msg.sender].hasAccepted = true;
        users[msg.sender].totalLoyalityTokenBalance += 5;
        users[referrals[msg.sender].referrer].totalLoyalityTokenBalance += 5;
        require((rewardToken).transfer(msg.sender, 5), "Transfer Failed");
        require(
            (rewardToken).transfer(referrals[msg.sender].referrer, 5),
            "Transfer Failed"
        );
        users[referrals[msg.sender].referrer].numberOfRefferrels += 1;
        emit Accepted(msg.sender, 10);
    }

    /**
     * @dev function to purchase the brand item
     * @param _brandid id of the brand
     * @param _tokenReward amount of the brand token
     * @param _productID id of the product
     * @param price price of the product
     */

    function purchase(
        uint256 _brandid,
        uint256 _tokenReward,
        uint256 _productID,
        uint256 price,
        uint256 _loyalityReward,
        uint256 deductAmount
    ) public payable {
        require(price == msg.value, "Must send ether to purchase");
        require(isBrand[brands[_brandid].name], "Invalid brand");
        brandTokens[msg.sender][_brandid] += _tokenReward;
        users[msg.sender].totalEtherSpent += msg.value;
        users[msg.sender].totalTokenRewards += _tokenReward;

        emit Purchase(msg.sender, _brandid, msg.value);
        emit ReceivedReward(msg.sender, _brandid, _tokenReward);
        Product memory _product = Product({
            productID: _productID,
            timestamp: block.timestamp,
            brandID: _brandid
        });
        users[msg.sender].products.push(_product);
        MintableToken(brands[_brandid].brandAddress).transfer(
            msg.sender,
            _tokenReward
        );
        if (_loyalityReward > 0) {
            require(
                (rewardToken).transfer(msg.sender, _loyalityReward),
                "Transfer Failed"
            );
            users[msg.sender].totalLoyalityTokenBalance += _loyalityReward;
        }
        if(deductAmount>0){
            users[msg.sender].totalBalance -= deductAmount;
        }
    }

    /**
     * @dev function to get the brand token balance
     * @param _user address of the user
     * @param _brandid id of the brand
     * @return uint256
     */
    function getBrandTokenBalance(address _user, uint256 _brandid)
        public
        view
        returns (uint256)
    {
        return brandTokens[_user][_brandid];
    }

    /**
     * @dev function to get the user details
     * @param _userAddress address of the user
     */
    function getUserDetails(address _userAddress)
        public
        view
        returns (
            uint256 id,
            uint256 totalEtherSpent,
            uint256 totalTokenRewards,
            uint256 numberOfRefferrels,
            uint256 totalLoyalityTokenBalance,
            uint256 totalBalance,
            Product[] memory products
        )
    {
        User memory user = users[_userAddress];
        return (
            user.id,
            user.totalEtherSpent,
            user.totalTokenRewards,
            user.numberOfRefferrels,
            user.totalLoyalityTokenBalance,
            user.totalBalance,
            user.products
        );
    }

    /**
     * @dev function to get the brand details
     * @param _brandId id of the brand
     */
    function getBrandDetails(uint256 _brandId)
        public
        view
        returns (
            uint256 id,
            string memory name,
            string memory symbol,
            uint256 tokenPercentage,
            address brandAddress,
            address brandOwner,
            uint256 basePrice
        )
    {
        Brand memory brand = brands[_brandId];
        return (
            brand.id,
            brand.name,
            brand.symbol,
            brand.tokenPercentage,
            brand.brandAddress,
            brand.brandOwner,
            brand.basePrice
        );
    }

    /**
     * @dev function to get the brand balance
     * @param _user address of the user
     * @param _brandId id of the brand
     * @return uint256
     */
    function getUserBrandBalance(address _user, uint256 _brandId)
        public
        view
        returns (uint256)
    {
        return brandTokens[_user][_brandId];
    }

    function checkIsBrand(string memory _name) public view returns (bool) {
        return isBrand[_name];
    }

    // 6. Check if an address is a user
    function checkIsUser(address _userAddress) public view returns (bool) {
        return isUser[_userAddress];
    }

    // 7. Get a user's purchased product IDs
    function getUserPurchasedProducts(address _user)
        public
        view
        returns (Product[] memory)
    {
        return users[_user].products;
    }
}
