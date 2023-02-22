import React, { useEffect } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchUser } from "../../store/slices/cfSlice";
import { BlobAnimation } from "./BlobAnimation";
import { generateColorPalette } from "../../store/slices/componentSlice";
import { Loading } from "../../common/types";

export const UserCover = () => {
  const useDispatch = useAppDispatch();

  const handle = useAppSelector((state) => state.preferences.handle);
  const user = useAppSelector((state) => state.cf.user);
  const isUserLoaded = useAppSelector((state) => state.cf.loading.user);

  useEffect(() => {
    handle && useDispatch(fetchUser(handle));
  }, [handle]);

  useEffect(() => {
    useDispatch(generateColorPalette({ url: user?.titlePhoto }));
  }, [user]);

  return (
    <Flex columnGap={"96"}>
      <Box
        position={"relative"}
        display={"inline-block"}
        top={"-7rem"}
        left={"40"}
        zIndex={"5"}
      >
        {isUserLoaded === Loading.SUCCEEDED ? (
          <>
            <Image
              src={user?.titlePhoto}
              boxSize={"xs"}
              objectFit={"cover"}
              borderRadius={"full"}
            />

            {<BlobAnimation />}
          </>
        ) : (
          <Skeleton
            count={1}
            height={"14rem"}
            width={"14rem"}
            circle={true}
            baseColor={"#dbedff"}
          />
        )}
      </Box>

      <Box py={"8"} fontWeight={"semibold"} lineHeight={"short"}>
        <Text fontSize={"2xl"} textTransform={"capitalize"}>
          {user?.firstName} {user?.lastName}
        </Text>

        <Text
          fontSize={"lg"}
          color={"font.muted2"}
          fontWeight={"normal"}
          textTransform={"capitalize"}
        >
          {user?.rank}
        </Text>
      </Box>
    </Flex>
  );
};