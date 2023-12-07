import { MultiSelect } from "@mantine/core";
const Setting = () => {
  const largeData = Array(100_000)
    .fill(0)
    .map((_, index) => `Option ${index}`);
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick value"
      limit={1000}
      data={largeData}
      searchable
    />
  );
};

export default Setting;
