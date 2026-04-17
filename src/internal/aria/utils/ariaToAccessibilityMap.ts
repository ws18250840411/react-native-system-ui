export const mapDomPropsToRN = (props: any) => {
  let newProps: any = { ...props };

  for (let key in props) {
    if (key.indexOf('data-') > -1) {
      if (!newProps.dataSet) {
        newProps.dataSet = {};
      }

      newProps.dataSet[key.split('data-')[1]] = props[key];
    }
  }

  return newProps;
};
