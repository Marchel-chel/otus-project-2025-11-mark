export type Subcategory = { name: string; link: string; title: string };
export type Category = {
  name: string;
  link: string;
  title: string;
  subcategories?: Subcategory[];
};

export const categories: Category[] = [
  { name: 'Books', link: 'books', title: 'Books' },
  {
    name: 'Computers',
    link: 'computers',
    title: 'Computers',
    subcategories: [
      { name: 'Desktops', link: 'desktops', title: 'Desktops' },
      { name: 'Notebooks', link: 'notebooks', title: 'Notebooks' },
      { name: 'Accessories', link: 'accessories', title: 'Accessories' },
    ],
  },
  {
    name: 'Electronics',
    link: 'electronics',
    title: 'Electronics',
    subcategories: [
      { name: 'Camera, photo', link: 'camera-photo', title: 'Camera, photo' },
      { name: 'Cell phones', link: 'cell-phones', title: 'Cell phones' },
    ],
  },
  { name: 'Apparel & Shoes', link: 'apparel-shoes', title: 'Apparel & Shoes' },
  {
    name: 'Digital downloads',
    link: 'digital-downloads',
    title: 'Digital downloads',
  },
  { name: 'Jewelry', link: 'jewelry', title: 'Jewelry' },
  { name: 'Gift Cards', link: 'gift-cards', title: 'Gift Cards' },
];
