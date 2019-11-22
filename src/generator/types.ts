import { DMMF } from "@prisma/photon/runtime";

export interface DMMFTypeInfo {
  // type: string | OutputType | Enum;
  type: string;
  isList: boolean;
  isRequired: boolean;
  kind: DMMF.FieldKind;
}

export interface GeneratedResolverData {
  modelName: string;
  resolverName: string;
  argTypeNames: string[];
}
