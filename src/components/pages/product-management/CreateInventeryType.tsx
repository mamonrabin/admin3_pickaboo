/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { Trash, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ColorPicker from "@/reuseble_components/ColorPicker";

/* ---------------- Inventory Types ---------------- */

export const inventoryTypes = [
  { id: 1, name: "Color", key: "colorInventory" },
  { id: 2, name: "Size", key: "levelInventory" },
  { id: 3, name: "Color - Size", key: "colorLevelInventory" },
  { id: 4, name: "Without Any", key: "inventory" },
];

/* ---------------- Types ---------------- */

type InventoryItem = {
  color?: string;
  colorName?: string;
  size?: string;
  quantity: string;
};

type CreateInventoryProps = {
  control: any;
  register: any;
  watch: any;
};

/* ---------------- Helpers ---------------- */

const getDefaultInventory = (): InventoryItem => ({
  color: "",
  colorName: "",
  size: "",
  quantity: "",
});

/* ---------------- Component ---------------- */

export function CreateInventeryType({
  control,
  register,
  watch,
}: CreateInventoryProps) {
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "inventories",
  });

  const selectedInventoryType = watch("inventoryType");

  useEffect(() => {
    if (!selectedInventoryType) {
      replace([]);
      return;
    }

    replace([getDefaultInventory()]);
  }, [selectedInventoryType, replace]);

  return (
    <div className="flex flex-col gap-4">
      {/* Inventory Type */}
      <div className="flex flex-col gap-2">
        <p className="text-sm">
          Inventory Type <span className="text-red-600">*</span>
        </p>

        <Controller
          name="inventoryType"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="md:w-77 w-full !h-10 rounded">
                <SelectValue placeholder="Select Inventory" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Inventory</SelectLabel>

                  {inventoryTypes.map((item) => (
                    <SelectItem key={item.id} value={item.key}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Inventory Items */}

      {selectedInventoryType &&
        fields.map((field, index) => (
          <div
            key={field.id}
            className="grid md:grid-cols-4 gap-3 border rounded p-4 relative"
          >
            {/* Color */}

            {(selectedInventoryType === "colorInventory" ||
              selectedInventoryType === "colorLevelInventory") && (
              <ColorPicker
                control={control}
                name={`inventories.${index}.color`}
              />
            )}

            {/* Color Name */}

            {(selectedInventoryType === "colorInventory" ||
              selectedInventoryType === "colorLevelInventory") && (
              <Input
              className="rounded h-9.5!"
                placeholder="Color Name"
                {...register(`inventories.${index}.colorName`)}
              />
            )}

            {/* Size */}

            {(selectedInventoryType === "levelInventory" ||
              selectedInventoryType === "colorLevelInventory") && (
              <Input
               className="rounded h-9.5!"
                placeholder="Size"
                {...register(`inventories.${index}.size`)}
              />
            )}

            {/* Quantity */}

            <Input
             className="rounded h-9.5!"
              placeholder="Quantity"
              type="number"
              {...register(`inventories.${index}.quantity`, {
                required: true,
              })}
            />

            {/* Remove */}

            {fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => remove(index)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}

      {/* Add Item */}

      {selectedInventoryType && selectedInventoryType !== "inventory" && (
        <Button
          type="button"
          variant="outline"
          className="w-fit rounded cursor-pointer"
          onClick={() => append(getDefaultInventory())}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      )}
    </div>
  );
}