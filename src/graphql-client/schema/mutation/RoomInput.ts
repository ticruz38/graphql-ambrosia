import StuffInput from './StuffInput';


const RoomInput = `
    input RoomInput {
        _id: String!
        name: String! # Room Name
        description: String # Room Description
        email: String,
        phoneNumber: String,
        pictures: [String] # Room pictures as a list of hash
        stuffs: [StuffInput]
    }
`;

export default () => [StuffInput, RoomInput];
