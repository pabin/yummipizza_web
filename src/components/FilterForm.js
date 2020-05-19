import React from 'react';

import {
  Form,
  Card,
} from 'react-bootstrap';



// Filter form component to display filter options
const FilterForm = (props) => {
  const { filters } = props

  return (
    <div>
      {
        filters.map((filter, index) => (
          <Card key={index} border="light" style={{marginBottom: "5px"}}>
            <Card.Header>{filter.name}</Card.Header>
            <Card.Body>
              <Form>
                {
                  filter.options.map((filterOption, indx) => (
                    <Form.Check
                      key={indx}
                      custom
                      type={filterOption.type}
                      id={filterOption.id}
                      label={filterOption.label}
                    />
                ))
                }
              </Form>
            </Card.Body>
          </Card>
        ))
      }
    </div>
  );
}


export default FilterForm
