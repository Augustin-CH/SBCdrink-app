import { faker } from '@faker-js/faker';


const dataFromAPI = [
    {
        id: 1,
        attributes: {
            name: "Sex on the beach",
            description: "Découvrez la recette du délicieux cocktail sex on the beach. À base de vodka, liqueur de pêches, jus d'ananas et jus de cranberry, ce cocktail est frais et idéal pour vos soirées d'été.",
            alcoholLevel: 27.27,
            alcoholMaxLevel: 15,
            alcoholMinLevel: 40,
            picture: {
                data: [
                    {
                        id: 1,
                        attributes: {
                            name: "sex_on_the_beach.png",
                            width: 260,
                            height: 579,
                            formats: {
                                // thumbnail: {
                                //     ...
                                // },
                                small: {
                                    name: "small_sex_on_the_beach.png",
                                    ext: ".png",
                                    mime: "image/png",
                                    width: 225,
                                    height: 500,
                                    url: "/uploads/small_sex_on_the_beach_581c3f50dc.png"
                                }
                            },
                            ext: ".png",
                            mime: "image/png",
                            url: "/uploads/sex_on_the_beach_581c3f50dc.png",
                        }
                    }
                ]
            }
        }
    }
];

// converte api format to cocktail format
const cocktails2 = dataFromAPI.map((cocktail, index) => ({
    id: cocktail.id,
    cover: cocktail.attributes.picture.data[0].attributes.url,
    title: cocktail.attributes.name,
    createdAt: faker.date.past(),
    view: faker.datatype.number(),
    comment: faker.datatype.number(),
    share: faker.datatype.number(),
    favorite: faker.datatype.number(),
    author: {
        name: faker.name.fullName(),
        avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    }
}));



// ----------------------------------------------------------------------

const COCKTAIL_TITLES = [
    'Margarita',
    'Mojito',
    'Bloody Mary',
];

const cocktails = [...Array(23)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: COCKTAIL_TITLES[index + 1],
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));

export default cocktails2;
