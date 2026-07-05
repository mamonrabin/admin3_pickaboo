/* eslint-disable @typescript-eslint/no-explicit-any */
export type TSubmenu = {
  href: string;
  label: string;
  active: boolean;
};

export type TMenu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: TSubmenu[];
};

export type TGroup = {
  groupLabel: string;
  menus: TMenu[];
};

export type TCategory = {
  _id: string;
  categoryName: string;
  title: string;
  slug: string;
  image: string;
};