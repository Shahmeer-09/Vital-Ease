import React, { ReactElement } from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./PatientForm";
import { LucideIcon } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
interface FormFields {
  control: Control<any>;
  name: string;
  type: FormFieldType;
  description?: string;
  label?: string;
  iconSource?: LucideIcon;
  placeholder?: string;
  explicitType?: string;
  showtimeselected?: boolean;
  dateformat?: string;
  renderfieldsradio?: (field: any) => React.JSX.Element;
  renderphysicianoption?: () => React.JSX.Element[];
  disabled?: boolean;
}

const RenderField = ({ field, props }: { field: any; props: FormFields }) => {
  const {
    type,
    iconSource: Icon,
    placeholder,
    explicitType,
    showtimeselected,
    dateformat,
    renderfieldsradio,
    renderphysicianoption,
    disabled,
    label
  } = props;
  switch (type) {
    case FormFieldType.INPUT:
      return (
        <div className=" flex xl:flex-1 rounded-md border border-dark-500 bg-dark-400  ">
          {Icon && (
            <div className=" flex w-[50px]  ">
              <Icon className=" text-dark-600  h-[24px] w-[24px] my-auto mx-auto " />
            </div>
          )}
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className={` border-0 shad-input  ${Icon && "!pl-0"}  `}
              disabled={disabled}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONEINPUT:
      return (
        <FormControl>
          <PhoneInput
            onChange={field.onChange}
            value={field.value}
            placeholder={placeholder ?? ""}
            withCountryCallingCode
            defaultCountry="PK"
            international
            className="input-phone"
            disabled={disabled}
          />
        </FormControl>
      );
    case FormFieldType.DATEPICKER:
      return (
        <div className=" flex rounded-md border border-dark-500 bg-dark-400 ">
          {Icon && (
            <div className=" flex w-[50px]  ">
              <Icon className=" text-dark-600  h-[24px] w-[24px] my-auto mx-auto " />
            </div>
          )}
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              showTimeSelect={showtimeselected ?? false}
              dateFormat={dateformat ?? "MM/dd/YYYY"}
              wrapperClassName=" date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return renderfieldsradio ? renderfieldsradio(field) : null;
    case FormFieldType.SELECT:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className=" shad-select-trigger">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent className=" shad-select-content  ">
            {renderphysicianoption ? renderphysicianoption() : null}
          </SelectContent>
        </Select>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            className=" shad-textArea  "
            disabled={disabled}
            {...field}
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className=" flex gap-4  ">
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            <Label>{label}</Label>
          </div>
        </FormControl>
      );
    default:
      return <Input {...field} {...props} />;
  }
};
const FormFieldsPatient = (props: FormFields) => {
  const { control, label, type, description, name } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className=" w-full ">
          {label && type !== FormFieldType.CHECKBOX && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className=" text-red-500 " />
        </FormItem>
      )}
    />
  );
};

export default FormFieldsPatient;
