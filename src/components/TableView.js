import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

const TableView = (props) =>{
  const { movieData, brushedIndex } = props;
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    let data = []
    brushedIndex.forEach(element => {
      data.push(movieData[element]);
    });
    setTableData(data);
	}, [brushedIndex]);

  const columns = [
    { title: 'title', field: 'title' },
    { title: 'genre', field: 'genre' },
    { title: 'creative_type', field: 'creative_type' },
    { title: 'release', field: 'release' },
    { title: 'rating',field: 'rating' }
  ];

  return(
    <div style={{marginTop: '20px'}}>
      <MaterialTable
            columns={columns}
            data={tableData}
            options={{
              toolbar: false,
              paging: false,
              maxBodyHeight: 350,
              rowStyle:{
                fontSize: 12.5,
              }
            }
            }
          />
    </div>
  )


}

export default TableView;