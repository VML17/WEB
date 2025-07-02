const db = require('./books.repo.db');

async function getAuthors() {
    const rezultat = await db.query('SELECT * FROM author');
    console.log('Rezultat:', rezultat);
    if (rezultat.length > 0) {
        return rezultat; // Vrati sve autore kao niz objekata
    } else {
        return []; // Ako nema autora, vrati prazan niz
    }
}

async function getAuthor(authorId) {
    const rezultat = await db.query('SELECT * FROM author WHERE authorId = $1', [authorId]);
    console.log('Rezultat:', rezultat);
    if (rezultat.length > 0) {
        return rezultat[0]; // Vrati prvog autora kao objekt
    } else {
        return null; // Ako nema autora s tim ID-em
    }
};

async function addAuthor(firstName, lastName, authorDOB, gender) {
    // try {
    if (!firstName || !lastName  || !authorDOB || !gender) 
        throw new Error('All fields are required');
    else{
        const rezultat = await db.query(
            'INSERT INTO author (authorFirstName, authorlastName, authorDOB, gender) VALUES ($1, $2, $3, $4) RETURNING *',
            [firstName, lastName, authorDOB, gender]
        );
    }
    // } catch (error) {
    //     console.error('Error adding author:', error);
    // }
}

module.exports = {
    getAuthor,
    addAuthor,
    getAuthors
};