// in src/posts.js
import * as React from "react";
import axios from "axios";
// tslint:disable-next-line:no-var-requires
import ImageZoom from "react-medium-image-zoom";
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
  RadioButtonGroupInput,
  BooleanField,
  ImageField,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="title" alwaysOn />
  </Filter>
);

export const QuestionList = (props) => (
  <List {...props} filters={<PostFilter />}>
    <Datagrid>
      <TextField source="Name" />
      <TextField source="createdate" />
      <TextField source="lastupdate" />
      <ShowButton label="" />
      {/* <EditButton label="" />
      <DeleteButton label="" redirect={false} /> */}
    </Datagrid>
  </List>
);
const ZoomImageField = ({ source, record, ...rest }) => {
  const imageUrl = record[source];

  return (
    <ImageZoom
      image={{
        src: imageUrl,
        className: "img",
        style: { width: 200 },
      }}
      zoomImage={{
        src: imageUrl,
        className: "img-zoomed",
      }}
    />
  );
};

const BooleanDisplay = ({ record, source }) => {
  console.log('RECORD', record)
  const src1 = source.split('.')[0]
  const src2 = source.split('.')[1]
  const src = record[src1][src2]

  return  (
    <p>{src ? 'Ja':'Nej'}</p>
    // <TextField label={'Test'}/>
  )
}
export const QuestionShow = (props) => {
  console.log("PROPS", props);
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="Name" />
        <TextField
          label={
            "Är någon av de av er uppgivna verkliga huvudmännen eller bolagets styrelseledamöter i politiks utsatt position?"
          }
        />
        {/* <BooleanField   source="question1.answer"   /> */}
        
        <BooleanDisplay source="question1.answer"  record={props.record} />
        <TextField
          label={"Har bolaget skulder till kronofogden?"}
          // source="question2.question"
        />
        {/* <BooleanField label={"Answer"} source="question2.answer" /> */}
        <BooleanDisplay source="question2.answer"  record={props.record} />
        <TextField label={"Har bolaget kontanta försäljningar"} />
        {/* <BooleanField label={"Answer"} source="question3.answer" /> */}
        <BooleanDisplay source="question3.answer"  record={props.record} />
   
        <ZoomImageField source="driving_license" />
        <TextField source="createdate" />
        <TextField source="lastupdate" />
      </SimpleShowLayout>
    </Show>
  );
};

export const QuestionCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="Name" />
      <TextInput disabled source="Are You a resident of sweden?" />
      <RadioButtonGroupInput
        source="Are You a resident of sweden?"
        choices={[
          { id: "Yes", name: "Yes" },
          { id: "No", name: "No" },
        ]}
      />
    </SimpleForm>
  </Create>
);

export const QuestionEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <RichTextInput source="body" />

      <FileInput source="file" label="File" accept="application/pdf">
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Edit>
);
