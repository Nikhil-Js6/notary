import './App.css';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Space, Table, Tag } from 'antd';
import axios from 'axios';

function App() {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        const res = await axios.post('http://demo2211087.mockable.io/mock');
        const newData = res.data?.companies?.map(company => {
            return { id: Math.ceil(Math.random() * 100), tags: [company.status], status: undefined, ...company }
        });
        setData(newData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = record => {
      data.length > 1
        ? setData(data.filter(e => {
            return e.name !== record.name
          }))
        : fetchData();
    }

    // const columns = [
    //   { field: 'id', headerName: 'ID', width: 150 },
    //   { field: 'name', headerName: 'Name', width: 350 },
    //   { field: 'email', headerName: 'Email', width: 350 },
    //   { field: 'status', headerName: 'Status', width: 150 },
    // ];

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => (
            <p style={{ cursor: 'pointer', color: '#1775e5' }}>
                { text }
            </p>
        ),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Status',
        dataIndex: 'tags',
        key: 'tags',
        render: (_, { tags }) => (
          <>
            {
              tags.map((tag) => (
                <Tag color={tag === 'active' ? 'green' : 'grey'} key={tag}>
                    {tag.toUpperCase()}
                </Tag>
              ))
            }
          </>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
              <p style={{ cursor: 'pointer', color: '#1775e5' }} onClick={() => handleDelete(record)}>
                  Delete
              </p>
          </Space>
        ),
      },
    ];

    return (
      <div className="App">
          <h1 className="App-title">Lists: </h1>
          <div className='table'>
            {
              data &&
               <>
                  <Table columns={columns} dataSource={data} />
               </>
            }
          </div>
      </div>
    );
}

export default App;
