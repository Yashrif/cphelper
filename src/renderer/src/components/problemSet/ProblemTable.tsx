import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  HStack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Tag,
  TagLabel
} from "@chakra-ui/react";
import _ from "lodash";
import { IoAddCircleOutline, IoCloseCircleOutline } from "react-icons/io5";

import { Loading, Problem } from "../../common/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchProblemSet } from "../../store/actions/cf/cfApiActions";
import {
  updateAddedProblemsAndDelete,
  updateAddedProblemsAndStore
} from "../../store/actions/cf/cfActions";
import { Pagination } from "./Pagination";
import { setTotalFilteredProblems } from "../../store/slices/utilsSlice";

export const ProblemTable = () => {
  const navigate = useNavigate();

  const PROBLEM_NAME_MAX_LENGTH = 25;
  // const PROBLEM_TAG_MAX_LENGTH = 40;

  const [filteredProblemSetAll, setFilteredProblemSetAll] = useState<Problem[]>([]);
  const [filteredProblemSet, setFilteredProblemSet] = useState<Problem[]>([]);
  // const [problemSetIndexStart, setProblemSetIndexStart] = useState(0);

  const dispatch = useAppDispatch();
  const selectedProblemTags = useAppSelector((state) => state.utils.selectedProblemTags);
  const problemSet = useAppSelector((state) => state.cf.problemSet);
  const isProblemSet = useAppSelector((state) => state.cf.loading.problemSet);
  const problemRatingRange = useAppSelector((state) => state.utils.problemRatingRange);
  const problemsPerPage = useAppSelector((state) => state.utils.problemsPerPage);
  const selectedProblemPage = useAppSelector((state) => state.utils.selectedProblemPage);

  const addedProblems = useAppSelector((state) => state.cf.addedProblems);

  useEffect(() => {
    dispatch(fetchProblemSet(selectedProblemTags));
  }, [selectedProblemTags]);

  useEffect(() => {
    if (problemSet && problemRatingRange)
      setFilteredProblemSetAll(
        _.filter(
          problemSet,
          (value) =>
            value?.rating >= problemRatingRange[0] && value?.rating <= problemRatingRange[1]
        )
      );
  }, [problemRatingRange, problemSet]);

  useEffect(() => {
    dispatch(setTotalFilteredProblems(filteredProblemSetAll?.length));
  }, [filteredProblemSetAll]);

  useEffect(() => {
    setFilteredProblemSet(
      filteredProblemSetAll.slice(
        (selectedProblemPage - 1) * problemsPerPage + 1,
        selectedProblemPage * problemsPerPage + 1
      )
    );
  }, [filteredProblemSetAll, problemsPerPage, selectedProblemPage]);

  // const makeSlice = (...args: string[]) => {
  //   const tagString = args.join(", ");

  //   let indexStart = 0;
  //   const newTagString: string[] = [];

  //   for (let i = 0; i < (tagString.length / 2) * 2; i++) {
  //     if (indexStart + PROBLEM_TAG_MAX_LENGTH >= tagString.length) {
  //       newTagString.push(tagString.slice(indexStart));
  //       break;
  //     }

  //     const lastIndex =
  //       _.lastIndexOf(
  //         tagString.slice(indexStart, indexStart + PROBLEM_TAG_MAX_LENGTH),
  //         ","
  //       ) + 1;

  //     const sliceLength =
  //       lastIndex > PROBLEM_TAG_MAX_LENGTH ? PROBLEM_TAG_MAX_LENGTH : lastIndex;

  //     newTagString.push(tagString.slice(indexStart, indexStart + sliceLength));
  //     indexStart += lastIndex;
  //   }

  //   return newTagString;
  // };

  const renderTags = (tags: string[]) =>
    tags.map((tag, index) => (
      <Tag
        key={index}
        size={"md"}
        borderRadius="full"
        variant="solid"
        background={
          "linear-gradient(90deg, hsla(210, 90%, 80%, .85) 0%, hsla(212, 93%, 49%, .9) 100%)"
        }
        m={"0 !important"}
      >
        <TagLabel px={"4"} py={"2"}>
          {tag}
        </TagLabel>
      </Tag>
    ));

  const renderProblems = (problems: Problem[]) =>
    problems.map((problem, index) => {
      const isAlreadyAdded = _.find(addedProblems, {
        contestId: problem.contestId,
        index: problem.index
      });

      return (
        <Tr
          key={index}
          color={"font.general"}
          fontSize={"lg"}
          cursor={"pointer"}
          transition={"all .3s"}
          overflow={"hidden"}
          backgroundColor={"transparent"}
          boxShadow={"none"}
          _hover={{
            background:
              "linear-gradient(90deg, hsla(210, 90%, 80%, 0.15) 0%, hsla(212, 93%, 49%, 0.3) 100%)",
            boxShadow: "0.4rem 0.4rem 0.8rem rgba(28, 126, 214, .15)"
          }}
        >
          <Td
            px={"12"}
            fontWeight={"medium"}
            textAlign={"center"}
            borderLeftRadius={"md"}
            transition={"all .3s"}
            _hover={{
              color: "primary.400"
            }}
            onClick={() => {
              navigate(`/problemset/problem/${problem.contestId}/${problem.index}`);
            }}
          >
            {problem.contestId + problem.index}
          </Td>

          <Td
            px={"12"}
            transition={"all .3s"}
            onClick={() => {
              navigate(`/problemset/problem/${problem.contestId}/${problem.index}`);
            }}
          >
            <Text
              mb={"12"}
              _hover={{
                color: "primary.400"
              }}
            >
              {problem.name.slice(0, PROBLEM_NAME_MAX_LENGTH) +
                (problem.name.length > PROBLEM_NAME_MAX_LENGTH ? "..." : "")}
            </Text>
            <HStack gap={"4"} wrap={"wrap"} justifyContent={"end"}>
              {renderTags(problem.tags)}
            </HStack>
          </Td>

          <Td
            px={"12"}
            textAlign={"center"}
            transition={"all .3s"}
            _hover={{
              color: "primary.400"
            }}
          >
            {problem.rating}
          </Td>

          <Td
            px={"12"}
            textAlign={"center"}
            transition={"all .3s"}
            _hover={{
              color: "primary.400"
            }}
          >
            {problem.solvedCount}
          </Td>

          <Td
            px={"12"}
            textAlign={"center"}
            borderRightRadius={"md"}
            transition={"all .3s"}
            _hover={{
              transform: "scale(1.15)"
            }}
            onClick={() => {
              if (isAlreadyAdded) dispatch(updateAddedProblemsAndDelete(problem));
              else dispatch(updateAddedProblemsAndStore(problem));
            }}
          >
            {isAlreadyAdded ? (
              <IoCloseCircleOutline size={"2.4rem"} color={"#f03e3e"} />
            ) : (
              <IoAddCircleOutline size={"2.4rem"} color={"#37b24d"} />
            )}
          </Td>
        </Tr>
      );
    });

  return (
    <Box height={"full"} overflowX={"hidden"} overflowY={"scroll"} pr={"0"}>
      {isProblemSet === Loading.SUCCEEDED && (
        <>
          <Table
            colorScheme="problemTable"
            size={"lg"}
            style={{ borderCollapse: "collapse" }}
            mb={"36"}
          >
            <Thead>
              <Tr>
                {["Id", "Problem Name", "Rating", "Solved", ""].map((title, index) => (
                  <Th
                    key={index}
                    color={"primary.600"}
                    fontSize={"xl"}
                    textTransform={"capitalize"}
                    textAlign={"center"}
                    px={"8"}
                    py={"16"}
                  >
                    {title}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>{renderProblems(filteredProblemSet)}</Tbody>
          </Table>

          <Pagination />
        </>
      )}
    </Box>
  );
};
