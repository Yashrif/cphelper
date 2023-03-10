import { useEffect, useState } from "react";
import { Flex, NumberInput, NumberInputField, Text } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setProblemsPerPage } from "../../store/slices/utilsSlice";

export const AdditionalOptions = () => {
  const [problemsPerPage, updateProblemsPerPage] = useState(
    useAppSelector((state) => state.utils.problemsPerPage)
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setProblemsPerPage(problemsPerPage));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [problemsPerPage]);

  return (
    <>
      <Flex alignItems={"center"} gap={"8"}>
        <Text fontSize={"lg"} fontWeight={"medium"} color={"font.muted"}>
          Problems per page:
        </Text>

        <NumberInput
          size={"md"}
          borderColor={"primary.400"}
          step={5}
          allowMouseWheel
          keepWithinRange={true}
          maxW="5.6rem"
          min={10}
          max={500}
          defaultValue={20}
          value={problemsPerPage}
          onChange={(_, value) => updateProblemsPerPage(value)}
        >
          <NumberInputField textAlign={"right"} />
        </NumberInput>
      </Flex>
    </>
  );
};
