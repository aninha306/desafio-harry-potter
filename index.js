const express = require('express');
const { Pool } = require('pg');

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
        if (result.rowCount === 0) {
            res.json({
                status: 'ótimo',
                message: 'não há bruxos cadastrados',
            });
        } else {
          res.json({
            status: 'ótimo',
            message: 'bruxos encontrados',
            total: result.rowCount,
            dados: result.rows,
        })
        }
        } catch (error) {
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
        res.status(201).json({
            status: 'ótimo',
            message: 'Bruxo adicionado com sucesso',
            dados: result.rows[0],
        });
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
        console.error('Erro ao deletar bruxo:', error);
        res.status(500).send('Erro ao deletar bruxo');
    }
});

app.get('/bruxos/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
        const result = await pool.query('SELECT * FROM bruxos WHERE id = $1', [id]);
  
        if (result.rowCount == 0) {
            return res.status(404).send('Bruxos não encontrado');
        }
        res.json({
            status: 'ótimo',
            message: 'Bruxo encontrado',
            dados: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao buscar bruxo', error);
        res.status(500).send('Erro ao buscar bruxo');
    }
  });

app.get('/varinhas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM varinhas');

        if (result.rowCount == 0) {
            res.json({
                status: 'ótimo',
                message: 'Não há varinhas cadastradas',
            });
        } else {
          res.json({
            status: 'ótimo',
            message: 'varinhas encontradas',
            total: result.rowCount,
            dados: result.rows,
        })
        }
    } catch (error) {
        console.error('Erro ao obter varinhas:', error);
        res.status(500).send('Erro ao obter varinhas');
    }
});



app.post('/varinhas', async (req, res) => {
    const { material, comprimento, nucleo, datadefabricacao } = req.body;
    const query = 'INSERT INTO varinhas (material, comprimento, nucleo, datadefabricacao) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [material, comprimento, nucleo, datadefabricacao];

    try {
        const result = await pool.query(query, values);
        res.status(201).json({
            status: 'ótimo',
            message: 'Varinha adicionada com sucesso',
            dados: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao criar a varinha:', error);
        res.status(500).send('Erro ao criar a varinha');
    }
});


app.put('/varinhas/:id', async (req, res) => {
    const id = req.params.id;
    const { material, comprimento, nucleo, datadefabricacao } = req.body;
    const query = 'UPDATE varinhas SET material=$1, comprimento=$2, nucleo=$3, datadefabricacao=$4 WHERE id=$5';
    const values = [material, comprimento, nucleo, datadefabricacao, id];

    try {
        await pool.query(query, values);
        res.send('Varinha atualizada com sucesso');
    } catch (error) {
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
    } catch (error) {
        console.error('Erro ao deletar a varinha:', error);
        res.status(500).send('Erro ao deletar a varinha');
    }
});

app.get('/varinhas/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
        const result = await pool.query('SELECT * FROM varinhas WHERE id = $1', [id]);
  
        if (result.rowCount == 0) {
            return res.status(404).send('varas não encontradas');
        }
        res.json({
            status: 'ótimo',
            message: 'varinha encontrada',
            dados: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao buscar bruxo', error);
        res.status(500).send('Erro ao buscar bruxo');
    }
  });


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.get('/', (req, res) => {
    res.send('a rota esta funcionando')
})