import React, { useEffect, useState } from 'react'
import sortBy from 'lodash/sortBy'
import {DataTable} from 'mantine-datatable'
import {IconEdit} from '@tabler/icons-react'
import { ActionIcon } from '@mantine/core'

const BrandsTable = () => {
    const [sortStatus,setSortStatus] = useState({ columnAccessor: 'id', direction: 'asc' });
    const [records,setRecords] = useState([
      { id: 1, percentNft:'.2%',name:"Tata",minimumPurchase:4000},
      { id: 2, percentNft:'.2%',name:"Tata",minimumPurchase:4000},
      { id: 3, percentNft:'.2%',name:"Tata",minimumPurchase:4000},
      { id: 4, percentNft:'.2%',name:"Tata",minimumPurchase:4000},
      { id: 5, percentNft:'.2%',name:"Tata",minimumPurchase:4000},
      { id: 6, percentNft:'.2%',name:"Tata",minimumPurchase:4000},
      { id: 7, percentNft:'.2%',name:"Tata",minimumPurchase:4000},
      { id: 8, percentNft:'.2%',name:"Tata",minimumPurchase:4000},
      { id: 9, percentNft:'.2%',name:"Tata",minimumPurchase:4000},
      { id: 10, percentNft:'.2%',name:"Tata",minimumPurchase:4000},
      { id: 11, percentNft:'.2%',name:"Tata",minimumPurchase:4000},
      { id: 12, percentNft:'.2%',name:"Tata",minimumPurchase:4000},
    ]);
  
    useEffect(()=>{
      const data = sortBy(records,sortStatus.columnAccessor);
      setRecords(sortStatus.direction==='desc'?data.reverse():data);
    },[sortStatus]);
  
    return (
      <DataTable
      borderRadius={15}
      highlightOnHover
      onSortStatusChange={setSortStatus}
      sortStatus={sortStatus}
      className='h-[70vh]'
        records={records}
        columns={[
            {
                accessor:'name',
                title:'Brand Name'
            },
            {
                accessor:'percentNft',
                title:'Percentage NFT',
            },
            {
                accessor:"minimumPurchase",
                title:'Minimum Purchase',
            }
        ].concat([
          {
            accessor: "actions",
            title: "",
            render: (record) => (
              <ActionIcon color="blue">
                  <IconEdit size={16} />
              </ActionIcon>
            ),
          },
        ])}
      />
    )
}

export default BrandsTable