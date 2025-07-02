const AuthorClass = class Author {
  constructor(id, firstName, lastName, DOB, gender) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.DOB = DOB;
    this.gender = gender;
  }

  get age() {
    return (new Date()).getFullYear() - this.DOB.getFullYear();
  }

  get formatedAuthor(){
    return (this.gender == 'm' ? 'Mr.' : 'Mrs.') + ` ${this.firstName} ${this.lastName} (${this.age} years old)`;
  }
};

AuthorClass.prototype.toString = function() {
  return this.formatedAuthor;
}

module.exports = AuthorClass;