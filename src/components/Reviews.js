import * as React from 'react';
import {
    Show,
    ShowButton,
    SimpleShowLayout,
    RichTextField,
    DateField,
    List,
    Edit,
    Create,
    Datagrid,
    ReferenceField,
    TextField,
    EditButton,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    Filter,
} from 'react-admin';
import Rating from "@mui/material/Rating";

const ReviewFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput
            label="User"
            source="userId"
            reference="users"
            allowEmpty
        >
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const ReviewList = props => (
    <List {...props} filters={<ReviewFilter />}>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField label="User" source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="title" />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);

const ReviewTitle = ({ record }) => {
    return <span>Review {record ? `"${record.title}"` : ''}</span>;
};

export const ReviewEdit = props => (
    <Edit title={<ReviewTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput label="User" source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
);

export const ReviewShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="brand" />
            <TextField source="product" />
            <RichTextField source="body" />
            <DateField label="Publication date" source="created_at" />
            <TextField source="email" />
            <Rating/>
        </SimpleShowLayout>
    </Show>
);
