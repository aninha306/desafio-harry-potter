const app = express();
const port = 5000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'desafio_harrypotter',
    password: 'ds564',
    port: 7007,
});

app.use(express.json());

app.get('/bruxos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bruxos');
        res.json(result.rows);
    } catch (err) {
        console.error('Erro ao obter os bruxos:', error);
        res.status(500).send('Erro ao obter os bruxos');
    }
});


app.post('/bruxos', async (req, res) => {
    const { nome, idade, casa, habilidade, statusdesangue } = req.body;
    const query = 'INSERT INTO bruxos (nome, idade, casa, habilidade, statusdesangue) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [nome, idade, casa, habilidade, statusdesangue];

    try {
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao criar o bruxo:', error);
        res.status(500).send('Erro ao criar o bruxo');
    }
});


app.put('/bruxos/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, idade, casa, habilidade, statusdesangue } = req.body;
    const query = 'UPDATE bruxos SET nome=$1, idade=$2, casa=$3, habilidade=$4, statusdesangue=$5 WHERE id=$6';
    const values = [nome, idade, casa, habilidade, statusdesangue, id];

    try {
        await pool.query(query, values);
        res.send('Bruxo atualizado com sucesso');
    } catch (err) {
        console.error('Erro ao atualizar bruxo:', error);
        res.status(500).send('Erro ao atualizar bruxo');
    }
});


app.delete('/bruxos/:id', async (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM bruxos WHERE id=$1';

    try {
        await pool.query(query, [id]);
        res.send('Bruxo deletado com sucesso');
    } catch (err) {
        console.error('Erro ao deletar bruxo:', error);
        res.status(500).send('Erro ao deletar bruxo');
    }
});


app.get('/varinhas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM varinhas');
        res.json(result.rows);
    } catch (err) {
        console.error('Erro ao obter varinhas:', error);
        res.status(500).send('Erro ao obter varinhas');
    }
});



app.post('/varinhas', async (req, res) => {
    const { material, comprimento, nucleo, datafabricacao } = req.body;
    const query = 'INSERT INTO varinhas (material, comprimento, nucleo, datafabricacao) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [material, comprimento, nucleo, datafabricacao];

    try {
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao criar a varinha:', error);
        res.status(500).send('Erro ao criar a varinha');
    }
});


app.put('/varinhas/:id', async (req, res) => {
    const id = req.params.id;
    const { material, comprimento, nucleo, datafabricacao } = req.body;
    const query = 'UPDATE varinhas SET material=$1, comprimento=$2, nucleo=$3, datafabricacao=$4 WHERE id=$5';
    const values = [material, comprimento, nucleo, datafabricacao, id];

    try {
        await pool.query(query, values);
        res.send('Varinha atualizada com sucesso');
    } catch (err) {
        console.error('Erro ao atualizar a varinha:', error);
        res.status(500).send('Erro ao atualizar a varinha');
    }
});


app.delete('/varinhas/:id', async (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM varinhas WHERE id=$1';

    try {
        await pool.query(query, [id]);
        res.send('Varinha deletada com sucesso');
    } catch (err) {
        console.error('Erro ao deletar a varinha:', error);
        res.status(500).send('Erro ao deletar a varinha');
    }
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});