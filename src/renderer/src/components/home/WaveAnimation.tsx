import { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import kute from "kute.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useAppSelector } from "../../hooks/hooks";
import { Loading } from "../../common/types";

/* ---------------- TODO: Randomize svg's colors using state ---------------- */

export const WaveAnimation = () => {
  const profileColorPalette = useAppSelector((state) => state.utils.profileColorPalette);
  const isProfileColorPaletteLoaded = useAppSelector(
    (state) => state.utils.loading.profileColorPalette
  );

  useEffect(() => {
    /* ---------------------- TODO: Set Timer for each wave ---------------------- */
    setTimeout(() => {
      kute
        .fromTo(
          "#wave1",
          { path: "#wave1" },
          { path: "#wave4" },
          { repeat: 99999, duration: 1200, yoyo: true }
        )
        .start();

      kute
        .fromTo(
          "#wave2",
          { path: "#wave2" },
          { path: "#wave3" },
          { repeat: 99999, duration: 1500, yoyo: true }
        )
        .start();

      kute
        .fromTo(
          "#wave3",
          { path: "#wave3" },
          { path: "#wave4" },
          { repeat: 99999, duration: 2200, yoyo: true }
        )
        .start();
    }, 10);
  }, []);

  return (
    <Box
      w={"full"}
      h={"3xs"}
      backgroundColor={"#fff4f2"}
      borderTopLeftRadius={"2rem"}
      borderTopRightRadius={"2rem"}
      overflow={"hidden"}
      position={"relative"}
    >
      {/* TODO: implement content info / quotes */}

      <Text
        fontSize={"lg"}
        fontWeight={"medium"}
        left={"50%"}
        position={"absolute"}
        top={"50%"}
        transform={"translate(-50%, -50%)"}
        zIndex={10}
        opacity={isProfileColorPaletteLoaded === Loading.SUCCEEDED ? 1 : 0}
      >
        Some Text - contest info / quotes
      </Text>

      {/* TODO: Change waves color */}

      <svg
        style={{
          transform: "scale(1.5)",
          opacity: `${isProfileColorPaletteLoaded === Loading.SUCCEEDED ? 1 : 0}`
        }}
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          id="wave1"
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          opacity=".25"
          className="shape-fill"
          fill={`${profileColorPalette ? profileColorPalette[0] : "#EE9F92"}`}
          // fill="#EE9F92"
          fillOpacity="1"
        ></path>
        <path
          id="wave2"
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          opacity=".5"
          className="shape-fill"
          fill={`${profileColorPalette ? profileColorPalette[1] : "#EE9F92"}`}
          // fill="#EE9F92"
          fillOpacity="1"
        ></path>
        <path
          id="wave3"
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          className="shape-fill"
          fill={`${profileColorPalette ? profileColorPalette[2] : "#EE9F92"}`}
          // fill="#EE9F92"
          fillOpacity="1"
        ></path>
        <path
          id="wave4"
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          opacity=".5"
          className="shape-fill"
          fillOpacity="1"
          visibility="hidden"
        ></path>
      </svg>

      {isProfileColorPaletteLoaded !== Loading.SUCCEEDED && (
        <Box
          position={"absolute"}
          height={"3xs"}
          width={"full"}
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
        >
          <Skeleton height={"100%"} width={"100%"} baseColor={"#fcede0"} />
        </Box>
      )}
    </Box>
  );
};
