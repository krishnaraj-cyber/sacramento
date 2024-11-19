import { Pagination } from '@nextui-org/react';
import { useMemo } from 'react';
export default function Tablepagination(props){
    const {rows,page,onPage,totalRecords}=props;
    
    const pages = useMemo(() => {
        return totalRecords ? Math.ceil(totalRecords / rows) : 0;
      }, [totalRecords, rows]);
    return(
        <div className="flex w-full  justify-between items-center p-2 px-8">
          <div></div>
        {/* {totalRecords > 0 && (<Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={(page) => onPage(page)}
        />)
        } */}
        <div>Total Records : {totalRecords}</div>
      </div>
    )
}