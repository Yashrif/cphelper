import { useEffect, useState } from "react";
import {
  Input,
  Text,
  Image,
  GridItem,
  Box,
  InputGroup,
  InputRightElement,
  Spinner
} from "@chakra-ui/react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setUpdatedHandle } from "@renderer/store/slices/utilsSlice";
import { fetchUser } from "../../store/actions/cf/cfActions";
import { Loading } from "../../common/types";

export const Handle = () => {
  const [isCheckmark, setIsCheckmark] = useState(true);
  const [firstChange, setFirstChange] = useState(false);

  const dispatch = useAppDispatch();

  const handle = useAppSelector((state) => state.settings.handle);
  const updatedHandle = useAppSelector((state) => state.utils.updatedHandle);
  const userPhoto = useAppSelector((state) => state.cf?.user?.titlePhoto);
  const userFetched = useAppSelector((state) => state.cf.loading.user === Loading.SUCCEEDED);
  const userPending = useAppSelector((state) => state.cf.loading.user === Loading.PENDING);
  const userRejected = useAppSelector((state) => state.cf.loading.user === Loading.FAILED);

  useEffect(() => {
    if (handle && !updatedHandle) dispatch(setUpdatedHandle(handle));
  }, [handle]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (updatedHandle) dispatch(fetchUser(updatedHandle));
    }, 500);

    return () => clearTimeout(timer);
  }, [updatedHandle]);

  useEffect(() => {
    if (userFetched) setIsCheckmark(true);
    let timer: NodeJS.Timeout;
    if (userFetched)
      timer = setTimeout(() => {
        setIsCheckmark(false);
      }, 1500);

    return () => clearTimeout(timer);
  }, [userFetched, updatedHandle]);

  return (
    <>
      <GridItem colSpan={2} justifySelf={"center"}>
        <Box boxSize={"36"}>
          {userPending || userRejected || updatedHandle?.length == 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 532 532"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              style={{
                backgroundColor: `${userPending ? "transparent" : "#f03e3e"}`,
                borderRadius: "100%"
              }}
            >
              <polygon
                points="379.19 379.04999 246.19 379.04999 246.19 199.04999 361.19 262.04999 379.19 379.04999"
                fill="#2f2e41"
              />
              <circle cx="270.76004" cy="260.93216" r="86.34897" fill="#ffb6b6" />
              <polygon
                points="221.19 360.04999 217.28893 320.61639 295.19 306.04999 341.19 418.04999 261.19 510.04999 204.19 398.04999 221.19 360.04999"
                fill="#ffb6b6"
              />
              <path
                d="m457.03998,451.08997c-.96997,1.01001-1.95996,2.01001-2.94995,3-3.14001,3.14001-6.34003,6.19-9.61005,9.15002-49,44.44-111.87,68.76001-178.47998,68.76001-61.40997,0-119.64001-20.67004-166.75-58.72003-.02997-.02002-.04999-.03998-.08002-.07001-1.42999-1.14996-2.83997-2.32001-4.25-3.51001.25-.71997.52002-1.42999.79004-2.13,15.14996-39.46997,45.07001-58.77997,63.22998-67.22998,9-4.19,15.10999-5.71997,15.10999-5.71997l21.32001-38.40002,15.01001,28,11.06,20.64001,45.38,84.66998,39.15002-97.47998,12.12994-30.22003,3.11005-7.73999,14.78998,11.51001,14,10.89001,28.19,6.21997,22.87,5.04999,31.06,6.86005c12.56,10.22998,20.20001,29.69,24.47003,53.87.15997.85999.31,1.72998.44995,2.59998Z"
                fill="#237bce"
              />
              <path
                d="m225.33945,162.80316c10.51816-17.66798,29.83585-29.79031,50.31992-31.577,20.48407-1.78667,41.60876,6.80817,55.02692,22.38837,7.99588,9.28423,13.23862,20.65456,21.03256,30.10893,16.77231,20.3455,45.37225,32.2415,52.69913,57.57068,3.19727,11.05298,1.6041,22.85326-.01367,34.24507-1.3866,9.76407-2.77322,19.52817-4.15985,29.29224-1.0791,7.59863-2.11386,15.60931.73538,22.73569,3.34277,8.36084,11.34241,13.83688,16.51462,21.20749,8.80081,12.54153,8.15744,30.90353-1.49963,42.79834-4.18805,5.15848-9.74042,9.04874-14.13116,14.03583s-7.64764,11.80563-5.80865,18.19058c3.52286,12.23126,22.70462,15.16449,24.80847,27.7179,1.07565,6.41818-3.35748,12.82758-9.1658,15.76245s-12.64572,3.02011-19.10587,2.23492c-24.55347-2.98438-47.28705-18.32629-59.24158-39.97961-11.95456-21.65335-12.82504-49.06561-2.26843-71.43384,8.67035-18.37146,24.78519-34.60559,24.60965-54.91949-.09564-11.0668-5.17172-21.4032-10.13535-31.29489-10.15924-20.24577-20.31851-40.49153-30.47775-60.7373-5.44196-10.84496-11.75745-22.53171-22.96112-27.19061-8.65872-3.60063-18.48325-2.20412-27.74442-.73141s-19.07155,2.90622-27.75604-.63181-15.24644-14.04982-11.1087-22.4651"
                fill="#2f2e41"
              />
              <path
                d="m240.47141,163.72575c-16.68272-5.49146-35.39705,3.32417-46.6913,16.77441-11.29425,13.45026-16.77287,30.70596-21.992,47.47588-2.98952,9.60582-5.97903,19.21164-8.96854,28.81747-2.81226,9.03625-5.6245,18.07248-8.43675,27.10873-3.30785,10.62869-6.64275,21.9205-3.92802,32.71591,1.96262,7.8046,7.01262,14.89124,7.12131,22.93808.11353,8.40567-5.15047,15.7851-9.7636,22.81268-4.61311,7.02759-8.94347,15.37701-6.74557,23.49103,3.34306,12.34174,20.502,19.12564,19.56139,31.87747-.3139,4.25571-2.7749,8.19205-2.73022,12.45908.05684,5.42914,4.30745,10.1203,9.2874,12.28336,4.97997,2.16306,10.5818,2.28052,16.01041,2.18506,16.65134-.29279,33.27257-2.27026,49.52779-5.89246,6.25403-1.39359,12.61382-3.10281,17.81967-6.83832s9.0894-9.92447,8.41191-16.29596c-1.05576-9.92862-11.73091-15.56143-17.11801-23.96805-5.29137-8.25723-5.16869-18.71957-7.45038-28.25763-3.13582-13.10846-10.88029-24.55249-16.69402-36.71249-21.85695-45.71606-14.20572-103.98718,18.71225-142.51109,2.91051-3.40616,6.0903-6.83273,7.30457-11.14532,1.21426-4.31261-.35107-9.80727-4.5697-11.31593"
                fill="#2f2e41"
              />
            </svg>
          ) : (
            <Image
              boxSize={"full"}
              src={userPending ? "" : userPhoto}
              border={"2px solid #62b1ff"}
              borderRadius={"full"}
              opacity={
                userFetched && firstChange && updatedHandle && updatedHandle?.length > 0 ? 1 : 0
              }
            />
          )}
        </Box>
      </GridItem>

      <Text fontSize={"lg"} fontWeight={"medium"} color={"font.muted"}>
        User handle:
      </Text>

      <InputGroup w={"3xs"}>
        <InputRightElement pointerEvents="none" mx={"8"} my={"2px"}>
          {updatedHandle &&
            updatedHandle?.length > 0 &&
            (userPending ? (
              <Spinner
                thickness="3px"
                speed="0.65s"
                emptyColor="gray.200"
                color="primary.500"
                size="lg"
              />
            ) : (
              <Box transition={"all .3s"} opacity={isCheckmark ? 1 : 0}>
                <IoMdCheckmarkCircleOutline color="#37b24d" size={"2.4rem"} />
              </Box>
            ))}
        </InputRightElement>
        <Input
          isInvalid={
            firstChange
              ? userFetched && updatedHandle && updatedHandle?.length > 0
                ? false
                : true
              : false
          }
          placeholder={updatedHandle ? updatedHandle : "handle..."}
          _placeholder={{
            color: "font.muted3"
          }}
          px={"16"}
          size={"lg"}
          borderColor={"primary.400"}
          step={5}
          maxW="3xs"
          value={updatedHandle ?? ""}
          onChange={(value) => {
            setFirstChange(true);
            dispatch(setUpdatedHandle(value.target.value));
          }}
        />
      </InputGroup>
    </>
  );
};
