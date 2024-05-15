import MeetingDisplay from "@/components/meeting/meeting-display";
import { View, Text } from "react-native";

import { Redirect, useLocalSearchParams } from "expo-router";
import FixedScroll from "@/components/FixedScroll";
import { useMeetings } from "@/hooks/useMeetings";
import Loader from "@/components/Loader";
import Icon, { IconType } from "@/components/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import RNFetchBlob from "rn-fetch-blob";
import DefaultLayout from "@/layout/DefaultLayout";

const MeetingDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { meetingQuery } = useMeetings({
    id: id,
    query: ["meetingQuery"],
  });

  if (meetingQuery.isLoading || meetingQuery.isPending) return <Loader />;
  if (meetingQuery.isError) return <Text>HUBO UN ERROR </Text>;

  const meeting = meetingQuery.data;

  if (!meeting) return <Redirect href={"/404"} />;

  const { notes, filename, urlAct } = meeting;

  const downloadFile = async () => {
    const { dirs } = RNFetchBlob.fs;
    const path = `${dirs.DownloadDir}/${filename}`;

    try {
      const res = await RNFetchBlob.config({
        fileCache: true,
        path,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: path,
          description: "Archivo descargado",
        },
      }).fetch("GET", urlAct);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DefaultLayout>
      <FixedScroll>
        <View className="flex-1 p-2 ">
          {meeting && <MeetingDisplay meeting={meeting} detail />}

          <View className="mt-4">
            <Text className="font-bold text-lg dark:text-white">Notas</Text>
            <View className="gap-2">
              {notes.map((note) => (
                <View
                  key={note.text}
                  className="flex-row items-center gap-2 ml-4"
                >
                  <Text className="dark:text-white">{"\u2022"}</Text>
                  <Text className="text-sm dark:text-white">{note.text}</Text>
                </View>
              ))}
            </View>
          </View>

          {urlAct && (
            <TouchableOpacity activeOpacity={0.8} onPress={downloadFile}>
              <View className="flex items-center justify-center mt-10 bg-primario-500 rounded-xl flex-row p-4 gap-3">
                <Text className="text-white font-bold">Descargar Acta</Text>

                <Icon
                  color={"#fff"}
                  icon={{
                    type: IconType.Feather,
                    name: "download-cloud",
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </FixedScroll>
    </DefaultLayout>
  );
};

export default MeetingDetail;
