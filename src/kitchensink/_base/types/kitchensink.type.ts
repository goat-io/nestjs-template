import { userType } from "./user.type";
import { carsType } from "./cars.type";
import { selectboxType } from "./selectbox.type";
import { surveyType } from "./survey.type";

export interface kitchensinkType {
    "id": string;
    "owner"?: string;
    "roles"?: string[];
    "_ngram"?: string;
    "form"?: string;
    "user"?: userType;
    
    "day"?: string;
    "cars"?: carsType[];
    "mycontent"?: string;
    "firstName"?: string;
    "lastName"?: string;
    "email"?: string;
    "checkbox"?: boolean;
    "textarea1"?: string;
    "text"?: string;
    "textarea2"?: string;
    "radio"?: string;
    "currency"?: string;
    "checkbox2"?: boolean;
    "selectbox"?: selectboxType;
    
    "name"?: string;
    "textarea3"?: string;
    "survey"?: surveyType;
    
    "dateTime"?: string;
    "pname"?: string;
    "fruits"?: string;
    "address": string;
    "resource"?: string;
    "signature"?: string;
    "nameHidden"?: string;
}