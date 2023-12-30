import { faker } from '@faker-js/faker';
import { Author } from "../models/Author";
import { Book } from '../models/Book';

interface AuthorModel<T extends object | number = object> {
  _id: T
}

export const createRandomAuthors = async (shouldCreateBook: boolean = false, limit: number = 7) => {
  const data = [];
  for(let i=0; i < limit; i++) {
    const person = {
      fullname: faker.person.firstName() + ' ' + faker.person.lastName(),
      email: faker.internet.email(),
      mobile: faker.phone.number(),
      address: faker.location.secondaryAddress(),
      gender: faker.person.sex(),
    }
    const author = await Author.create(person);
    if(shouldCreateBook)
      await createRandomBooks(author);
    data.push(person);
  }
  // return await Author.insertMany(data);
}

const createRandomBooks = async (author: AuthorModel) => {
  const bookLimit = Math.ceil(Math.random() * 10);
  for(let i=0; i < bookLimit; i++) {
    const book = {
      title: faker.lorem.words({min: 3, max: 6}),
      description: faker.lorem.sentences({min: 5, max: 10}),
      isActive: (i % 2) === 0,
      author: author._id
    }
    await Book.create(book);
  }
}