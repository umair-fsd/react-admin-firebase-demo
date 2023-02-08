// in src/posts.js
import * as React from "react";
import axios from "axios";
// tslint:disable-next-line:no-var-requires
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  Filter,
  SimpleShowLayout,
  SimpleForm,
  ReferenceField,
  ReferenceInput,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  RichTextField,
  SelectInput,
  FileField,
  FileInput,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

const PartnerFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="title" alwaysOn />
  </Filter>
);



export const PartnerList = (props) => (
  <List {...props} filters={<PartnerFilter />}>
    <Datagrid>
    <TextField source="name" />
      <TextField source="title" />
      <TextField source="createdate" />
      {/* <TextField source="lastupdate" /> */}
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

export const PartnerShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="title" />
      <TextField source="createdate" />
      <TextField source="lastupdate" />

    </SimpleShowLayout>
  </Show>
);

export const PartnerCreate = (props) => (
  <Create  {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="title" />
     
    </SimpleForm>
  </Create>
);

export const PartnerEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
     
    <TextInput source="name" />
    <TextInput source="title" />
    </SimpleForm>
  </Edit>
);
