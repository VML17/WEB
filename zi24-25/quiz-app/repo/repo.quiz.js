// Podaci za kviz
const quiz = {
    title: "Koliko poznaješ legendarne svjetove?",
    description: "Testiraj svoje znanje o Star Warsu, Harryju Potteru, Marvelu i Gospodaru prstenova",
    questions: [
        {
            id: 1,
            question: "Koji je rodni planet Lukea Skywalkera?",
            options: ["Coruscant", "Hoth", "Tatooine", "Dagobah"],
            correctAnswer: 2,
            category: "Star Wars"
        },
        {
            id: 2,
            question: "U koji dom je Harry Potter svrstan u Hogwartsu?",
            options: ["Slytherin", "Hufflepuff", "Ravenclaw", "Gryffindor"],
            correctAnswer: 3,
            category: "Harry Potter"
        },
        {
            id: 3,
            question: "Kako se zove brod Hana Sola?",
            options: ["X-wing", "TIE Fighter", "Millennium Falcon", "Star Destroyer"],
            correctAnswer: 2,
            category: "Star Wars"
        },
        {
            id: 4,
            question: "Kako se zove sova Harryja Pottera?",
            options: ["Hedwig", "Errol", "Pigwidgeon", "Fawkes"],
            correctAnswer: 0,
            category: "Harry Potter"
        },
        {
            id: 5,
            question: "Koji je superherojski identitet Tonyja Starka?",
            options: ["War Machine", "Iron Man", "Captain America", "Thor"],
            correctAnswer: 1,
            category: "Marvel"
        },
        {
            id: 6,
            question: "Tko je bio čuvar Jedinstvenog Prstena prije Froda?",
            options: ["Gandalf", "Bilbo Baggins", "Gollum", "Aragorn"],
            correctAnswer: 1,
            category: "Lord of the Rings"
        }
    ]
};

module.exports = quiz;