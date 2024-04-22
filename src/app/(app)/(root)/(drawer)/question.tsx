import React from "react";
import { ScrollView, Text, View } from "react-native";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DefaultLayout from "@/layout/DefaultLayout";

const Question = () => {
  return (
    <DefaultLayout>
      <Accordion className="w-full max-w-xl">
        <AccordionItem>
          <AccordionTrigger>
            <Text className="text-foreground text-xl pb-1.5">Item #1</Text>
            <Text className="text-foreground opacity-90">Subtext example</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className="p-20 bg-blue-500"></View>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionTrigger>
            <Text className="text-foreground text-xl">Item #2</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className="p-12 bg-red-500"></View>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionTrigger>
            <Text className="text-foreground text-xl">Item #3</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className="p-24 bg-purple-500"></View>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionTrigger>
            <Text className="text-foreground text-xl">Item #4</Text>
          </AccordionTrigger>
          <AccordionContent>
            <View className="p-8 bg-orange-500"></View>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </DefaultLayout>
  );
};

export default Question;

// const Questions = () => {
//   const state = {
//     activeSections: [],
//     collapsed: true,
//     multipleSelect: false,
//   };

//   const setSections = (sections: any) => {
//     this.setState({
//       activeSections: sections.includes(undefined) ? [] : sections,
//     });
//   };

//   const renderHeader = (section, _, isActive) => {
//     return (
//       <Animatable.View
//         duration={400}
//         style={[styles.header, isActive ? styles.active : styles.inactive]}
//         transition="backgroundColor"
//       >
//         <Text style={styles.headerText}>{section.question}</Text>
//       </Animatable.View>
//     );
//   };

//   const renderContent = (section, _, isActive) => {
//     return (
//       <Animatable.View
//         duration={400}
//         style={[styles.content, isActive ? styles.active : styles.inactive]}
//         transition="backgroundColor"
//       >
//         <Animatable.Text animation={isActive ? "bounceIn" : undefined}>
//           {section.content}
//         </Animatable.Text>
//       </Animatable.View>
//     );
//   };
//   const { questionsQuery } = useQuestions();

//   return (
//     <DefaultLayout>
//       <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
//         <Text style={styles.title}>Accordion Example</Text>

//         <Accordion
//           activeSections={activeSections}
//           sections={questionsQuery.data || []}
//           touchableComponent={TouchableOpacity}
//           renderHeader={renderHeader}
//           renderContent={renderContent}
//           duration={400}
//           onChange={setSections}
//           renderAsFlatList={false}
//         />
//       </ScrollView>
//     </DefaultLayout>
//   );
// };

// export default Questions;
// export default class App extends Component {
//   state = {
//     activeSections: [],
//     collapsed: true,
//     multipleSelect: false,
//   };

//   toggleExpanded = () => {
//     this.setState({ collapsed: !this.state.collapsed });
//   };

//   setSections = (sections) => {
//     this.setState({
//       activeSections: sections.includes(undefined) ? [] : sections,
//     });
//   };

//   renderHeader = (section, _, isActive) => {
//     return (
//       <Animatable.View
//         duration={400}
//         style={[styles.header, isActive ? styles.active : styles.inactive]}
//         transition="backgroundColor"
//       >
//         <Text style={styles.headerText}>{section.question}</Text>
//       </Animatable.View>
//     );
//   };

//   renderContent(section, _, isActive) {
//     return (
//       <Animatable.View
//         duration={400}
//         style={[styles.content, isActive ? styles.active : styles.inactive]}
//         transition="backgroundColor"
//       >
//         <Animatable.Text animation={isActive ? "bounceIn" : undefined}>
//           {section.content}
//         </Animatable.Text>
//       </Animatable.View>
//     );
//   }

//   render() {
//     const { multipleSelect, activeSections } = this.state;

//     const { questionsQuery } = useQuestions();

//     return (
//       <DefaultLayout>
//         <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
//           <Text style={styles.title}>Accordion Example</Text>

//           <Accordion
//             activeSections={activeSections}
//             sections={questionsQuery.data || []}
//             touchableComponent={TouchableOpacity}
//             expandMultiple={multipleSelect}
//             renderHeader={this.renderHeader}
//             renderContent={this.renderContent}
//             duration={400}
//             onChange={this.setSections}
//             renderAsFlatList={false}
//           />
//         </ScrollView>
//       </DefaultLayout>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5FCFF",
//     paddingTop: Constants.statusBarHeight,
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 22,
//     fontWeight: "300",
//     marginBottom: 20,
//   },
//   header: {
//     backgroundColor: "#FFF",
//     padding: 10,
//   },
//   headerText: {
//     textAlign: "center",
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#fff",
//   },
//   content: {
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   active: {
//     backgroundColor: Colors.primario[600],
//   },
//   inactive: {
//     backgroundColor: Colors.primario[800],
//   },
//   selectors: {
//     marginBottom: 10,
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   selector: {
//     backgroundColor: "white",
//     padding: 10,
//   },
//   activeSelector: {
//     fontWeight: "bold",
//   },
//   selectTitle: {
//     fontSize: 14,
//     fontWeight: "500",
//     padding: 10,
//   },
//   multipleToggle: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginVertical: 30,
//     alignItems: "center",
//   },
//   multipleToggle__title: {
//     fontSize: 16,
//     marginRight: 8,
//   },
// });
