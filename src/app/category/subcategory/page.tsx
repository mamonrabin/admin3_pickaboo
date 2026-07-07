import CreateSubCategory from "@/components/pages/subcategoty_managment/CreateSubCategory";
import SubCategoryList from "@/components/pages/subcategoty_managment/SubCategoryList";
import React from "react";

const Subcategory = () => {
  return (
    <div className="flex flex-col gap-4  rounded md:p-8 p-4 shadow bg-secondary mt-8 relative bottom-4">
      <CreateSubCategory />

      <SubCategoryList />
    </div>
  );
};

export default Subcategory;
