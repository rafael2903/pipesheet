import DataTable from 'react-data-table-component';
import Integrations from 'models/integrations';
import api from 'config/api';
import {  useState } from 'react';

export default function IntegrationsPage({ integrations }) {
  const [data, setData] = useState(integrations);
  const [loading, setLoading] = useState(false);

  async function deleteIntegration(integrationId) {
    setLoading(true);
    try {
      await api.delete(`/integrations/${integrationId}`);
      const { data } = await api.get('/integrations');
      setData(data.integrations);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    };
  }

  const columns = [
    {
      name: 'Title',
      selector: 'title',
    },
    {
      name: 'Pipe Id',
      selector: 'pipeId',
    },
    {
      name: 'Spreadsheet Id',
      selector: 'spreadsheetId',
    },
    {
      name: '',
      selector: 'id',
      cell: ({ id }) => (
        <button
          style={{ backgroundColor: 'red', color: 'white', padding: 10 }}
          onClick={() => deleteIntegration(id)}
        >
          {loading ? 'Loading...' : 'X'}
        </button>
      ),
    },
  ];

  return (
    <div>
      <DataTable title='Integrações' columns={columns} data={data} />
    </div>
  );
}

export async function getServerSideProps() {
  const integrations = await Integrations.all();
  return { props: { integrations } };
}
