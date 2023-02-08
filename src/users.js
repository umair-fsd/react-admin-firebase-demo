// in src/User.js
import * as React from "react";
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
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  BooleanInput,
  BooleanField
} from "react-admin";
import { auth } from "./FIREBASE_CONFIG";

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="title" alwaysOn />
  </Filter>
);

export const UserList = (props) => (
  <List {...props} filters={<UserFilter />}>
    <Datagrid>
      <TextField source="name" />
      <TextField source="email" />
      <BooleanField label="Lönespecifikation" source="notification1" />
      <BooleanField label="Deklarera igen" source="notification2" />
      <BooleanField source="isAdmin" />

      {/* <ShowButton label="" /> */}
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

export const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="password" />
      <TextField source="notifications" />
      <TextField source="isAdmin" />
    </SimpleShowLayout>
  </Show>
);

export const UserCreate = (props) => (
  <Create
    {...props}
    onSuccess={({ data }) => {
      auth.createUserWithEmailAndPassword(data.email, data.password);
      console.log("datahere", data);
    }}
  >
    <SimpleForm mutationMode="pessimistic">
      <TextInput source="name" />
      <TextInput source="email" type={"email"} />
      <TextInput source="password" />
      <BooleanInput label="Admin?" source="isAdmin" />
      <BooleanInput
        label="Enable Notification (Du har en ny lönespecifikation)"
        source="notification1"
      />
      <BooleanInput
        label="Enable Notification (Dags att deklarera igen)"
        source="notification2"
      />
    </SimpleForm>
  </Create>
);

export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput disabled source="createdate" />
      <TextInput disabled source="lastupdate" />
      <TextInput disabled source="email" />
      <TextInput source="name" />
      <TextInput source="password" />
      <BooleanInput label="Admin?" source="isAdmin" />
      <BooleanInput
        label="Enable Notification (Du har en ny lönespecifikation)"
        source="notification1"
      />
      <BooleanInput
        label="Enable Notification (Dags att deklarera igen)"
        source="notification2"
      />
    </SimpleForm>
  </Edit>
);
