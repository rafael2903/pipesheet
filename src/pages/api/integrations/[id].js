import nc from 'next-connect';
import Integrations from 'models/integrations';
import { client } from 'config/gql';
import { getAllCards, getPhases } from 'queries';

const handler = nc()
    .get(async (req, res) => {
        const { id } = req.query;
        
        try {
            const { title, pipeId, spreadsheetId, sheetId, webhookId } = await Integrations.find(id);
            const integration = { id, title, pipeId, spreadsheetId, sheetId, webhookId };
            res.status(200).json({ integration });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }) 
    .post(async (req, res) => {     // rota que o pipefy vai fazer o request 
        const { id } = req.query;
        
        try {
            const { title, pipeId, spreadsheetId, sheetId, webhookId } = await Integrations.find(id);
            const { pipe } = await client.request(getPhases, { pipeId });

            const reducer = (accumulator, currentValue) => [...accumulator, ...currentValue];

            const phases = pipe.phases.map(phase => phase.name);
            const fields = pipe.phases.map(phase => phase.fields).reduce(reducer).map(field => field.label);

            const { allCards } = await client.request(getAllCards, { pipeId });
            let cards = allCards.edges.map(({ node }) => ({
                    title: node.title,
                    id: node.id,
                    done: node.done,
                    current_phase: node.current_phase.name,
                    labels: node.labels.map(label => label.name),
                    due_date: node.due_date,
                    createdAt: node.createdAt,
                    createdBy: node.createdBy.name,
                    updated_at: node.updated_at,
                    assignees: node.assignees.map(assignee => assignee.name),
                    phases_history: node.phases_history.map(phase => ({ 
                        name: phase.phase.name,
                        duration: phase.duration,
                        firstTimeIn: phase.firstTimeIn,
                        lastTimeOut: phase.lastTimeOut,
                    })),
                    ...node.fields.reduce(( acc, cur) => ({ ...acc, [cur.name]: cur.value }), {})
                }));

            // cards.forEach(card => card.fields.forEach(({ name }) => {
            //     card[name] = field.value
            // }))

            res.status(200).json({ cards });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
    .delete(async (req, res) => {
        const { id } = req.query;
        try {
            await Integrations.destroy(id);
            res.status(200).json({ message: 'Delete complete'});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

export default handler;
