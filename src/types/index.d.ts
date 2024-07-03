export type Feature = {
  button: button;
  image: string;
  bulletpoints: string[];
  content: string;
  title: string;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};

export type CategoryItem = {
  id: number;
  name: string;
};

export type ElementItem = {
  id: number;
  name?: string;
  href?: string;
}

export type ElementsByCategoryItem = {
  kind: CategoryItem;
  items: ElementItem[];
};
