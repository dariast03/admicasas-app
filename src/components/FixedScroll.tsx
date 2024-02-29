import { FlatList, FlatListProps } from "react-native";

type Props = React.PropsWithChildren &
  Omit<FlatListProps<null>, "data" | "renderItem" | "ListHeaderComponent">;

const FixedScroll: React.FC<Props> = (props) => {
  return (
    <FlatList
      {...props}
      data={null}
      renderItem={null}
      ListHeaderComponent={() => props.children}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};
export default FixedScroll;
