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

export type TCoupon = {
  _id: string;
  code: string;
  discount: number;
  discountType: string;
  useLimit: number;
  used: number;
  perUserLimit: number;
  startDate: string;
  expireDate: string;
  couponType: string;
  categoryID?: TCategory;
  brandID?: TBrand;
  subCategoryID?: TSubCategory;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TCampaign = {
  _id: string;
  title: string;
  image?: string;
  couponId: TCoupon;
};

export type TAuth = {
  provider: string;
  providerId: string;
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
  address: string;
  isActive: string;
  password: string;
  phone: string;
  image: string;
  picture: string;
  auths: TAuth[];
  role: string;
  createdAt: string;
};

export type TBanner = {
  _id: string;
  title?: string;
  category?: TCategory;
  image: string;
  description?: string;
  link?: string;
  type: string;
};

export type TPolicy = {
   _id: string;
  title: string;
  description: string;
  type: string;
};
export type TAbout = {
   _id: string;
  description: string;
  type: string;
};
export type TContact = {
   _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};
