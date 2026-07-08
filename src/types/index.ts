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

export type TSubCategory = {
  _id: string;
  category: {
    _id: string;
    categoryName: string;
  };
  subcategoryName: string;
  image: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TBrand = {
  _id: string;
  title: string;
  image: string;
  slug: string;
};

export type TInventory = {
  _id: string;
  id: string;
  color?: string;
  colorName?: string;
  size?: string;
  quantity: number;
};

export type TSpecification = {
  key: string;
  value: string;
};

export type TProduct = {
  _id: string;
  title: string;
  mrpPrice: number;
  discount?: number;
  discountType?: string;
  soldQuantity?: number;
  description: string;
  category: TCategory;
  subCategory?: TSubCategory;
  brand?: TBrand;
  thumbnailImage: string;
  backviewImage?: string | null | undefined;
  images?: string[];
  freeShipping?: boolean;
  inventoryType?: string;
  inventories?: TInventory[];
  stock_status?: string;
  label?: string;
  tags?: string[];
  specifications?: TSpecification[];
  averageRating?: number;
  totalReviews?: number;
  metaTitle?: string;
  metaDescription?: string;
  quantity?: number;
  slug?: string;
  sku?: string;
  price: number;
  availableQuantity?: number;
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};
