import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NavSelect = () => {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-full bg-transparent border-none">
          <SelectValue placeholder="Location" className="text-white" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">
            <span className="flex flex-row gap-5 w-full justify-between items-center">
              <HiLocationMarker />
              <p> India</p>
            </span>
          </SelectItem>
          <SelectItem value="New york">
            <span className="flex flex-row gap-5 w-full justify-between items-center">
              <HiLocationMarker />
              <p> New york</p>
            </span>
          </SelectItem>
          <SelectItem value="Yaba Left">
            <span className="flex flex-row gap-5 w-full justify-between items-center">
              <HiLocationMarker />
              <p> Yaba Left</p>
            </span>
          </SelectItem>
          <SelectItem value="Ikorodu">
            <span className="flex flex-row gap-5 w-full justify-between items-center">
              <HiLocationMarker />
              <p> Ikorodu</p>
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default NavSelect;
