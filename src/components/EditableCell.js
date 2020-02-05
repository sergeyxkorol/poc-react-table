import React from 'react';
import './EditableCell.scss';

export default function EditableCell({
  cell: { value: initialValue },
  row: { index },
  column: { id },
  updateData
}) {
  const [value, setValue] = React.useState(initialValue);

  const onChange = event => {
    setValue(event.target.value);
  };

  const onBlur = () => {
    updateData(index, id, value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} className="editable-cell" />;
}
