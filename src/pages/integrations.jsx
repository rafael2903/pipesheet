import DataTable from 'react-data-table-component';
import Integrations from 'models/integrations';
import {  useState } from 'react';
import { DeleteButton } from 'components';
export default function IntegrationsPage({ integrations }) {
  const [data, setData] = useState(integrations);
  

  const columns = [
    {
      name: 'Título da integração',
      selector: row => <div style={{ whiteSpace: 'normal', textAlign: 'start' }}>{row.title}</div>,
    },
    {
      name: 'Id do pipe',
      selector: 'pipeId',
    },
    {
      name: 'Id da planilha',
      selector: row => <div style={{ whiteSpace: 'normal', textAlign: 'start' }}>{row.spreadsheetId}</div>,
    },
    {
      name: '',
      selector: 'id',
      cell: ({ id }) => DeleteButton(id, setData)
    },
  ];

  return (
    <div className=" container mx-auto mt-20">
      <div className="flex flex-col  text-center items-center justify-center h-auto max-w-full min-w-lg px-2 sm:px-0">
        <h1 className="text-4xl mb-5">Integrações</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const integrations = await Integrations.all();
  return { props: { integrations } };
}
