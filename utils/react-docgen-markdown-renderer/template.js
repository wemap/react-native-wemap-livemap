module.exports = (data) => {
  const props = Object.entries(data.props).reduce(
    (a, e) => {
      if (e[1].type) {
        switch (e[1].type.name) {
          case 'shape':
            a.shape = [...a.shape, e];
            break;
          case 'func':
            a.func = [...a.func, e];
            break;
          case 'custom':
            a.custom = [...a.custom, e];
            break;

          default:
            a.others = [...a.others, e];
            break;
        }
      }
      return a;
    },
    { shape: [], func: [], custom: [], others: [] }
  );

  return `
# ${data.displayName}

*${data.description}*


## Props
### Shape

${props.shape
  .map(
    ([propName, { type, required, description }]) => `
### ${propName}  

**Required:** *${required}*  
**Description:** *${description}*
${
  type &&
  type.value &&
  `
**Properties:**

name | type | required | description
---- | :-------: | :--------: | -----------
${Object.entries(type.value)
  .map(
    ([propertyName, { name, required, description }]) =>
      `${propertyName} | ${name} | ${required} | ${description}`
  )
  .join('\n')}
`
}
`
  )
  .join('\n')}

### Callbacks

prop | default | required | description
---- | :-------: | :--------: | -----------
${props.func
  .map(([propName, { defaultValue, required, description }]) => {
    return `${propName} | ${defaultValue && defaultValue.value} | ${required} | ${description}`;
  })
  .join('\n')}

### Custom

prop | default | required | description
---- | :-------: | :--------: | -----------
${props.custom
  .map(([propName, { type, defaultValue, required, description }]) => {
    return `${propName} | ${defaultValue && defaultValue.value} | ${required} | ${description}`;
  })
  .join('\n')}

## Methods

*All the methods of the livemap are available from its reference.
For more information see the <a href="https://github.com/wemap/react-native-wemap-livemap/tree/master/example/" target="_blank">example</a>.*

${data.methods
  .filter(({ description }) => description)
  .map(
    ({ name, params, description }) => `
### ${name}

**Description:** *${description}*
${
  params.length > 0 ? 
  `
**Parameters:**  

name | type | optional | description
---- | :--------: | :-------: | -----------
${params
  .map(
    ({ name, type, optional, description }) =>
      `${name} | ${type && type.name} | ${optional} | ${description}`
  )
  .join('\n')}
  ` : ``
}
`
  )
  .join('\n<br/>\n')}
`;
};
