// class Repository {
    
//     constructor() {
//         this.seedRepo();
//     }
    
//     getCategories() {
//         return this.categories;
//     }
//     getCategory(catName) {
//         return this.categories.find(x => x.catName == catName);
//     }
//     subscribe(catName, nick, email) {
//         let category = this.getCategory(catName);
//         if (category && category.subs.find(x => x.nick == nick && x.email == email)){
//             return 0;
//         } else {
//              category.subs.push({
//                 nick, email
//              });
//              return 1;
//         }
//     }
//     /************ Seeding repo below: ****************/
//     seedRepo() {
//         this.categories = ['Outdoors', 'Sports', 'Pizzas', 'Woks', 'Politics', 'Technology', 'Pets', 'BBQ'];
//         this.categories = this.categories.map(x => ({
//             catName: x,
//             subs: []
//         }));
//     }
// }
// const repoInstance = new Repository();

// module.exports = repoInstance;




class repo {
    constructor(){
        this.category = new Map();
        this.seedCategories();
    }

    seedCategories(){
        const cat = ['Outdoors', 'Sports', 'Pizzas', 'Woks', 'Politics', 'Technology', 'Pets', 'BBQ'];
        for (let name of cat){
            this.category.set(name, {
                name: name,
                quantity: 0,
                img: `${name}.jpg`,
                mailNick: []
            })
        }
    }

    addUser(categoryName, user){
        const list = this.category.get(categoryName).mailNick;
        if (list.some(u => u.email === user.email && u.email === user.email)){
            return false;
        } else {
            this.category.get(categoryName).mailNick.push(user);
            this.category.get(categoryName).quantity++;
            return true;
        }
    }
    getRepo(){
        return Array.from(this.category.values());
    }
}

const repoInstance = new repo();
module.exports = repoInstance;