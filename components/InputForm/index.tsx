import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { Slider } from "@reach/slider";
import "@reach/slider/styles.css";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import { Calendar } from "@amir04lm26/react-modern-calendar-date-picker";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const Container = styled.div`
  .Calendar {
    background: #0f0f0f;
    --cl-color-disabled: rgba(255, 255, 255, 0.4);
    --cl-color-primary: #ffe074 !important;
    margin-bottom: 3rem;
  }

  .Calendar__day.-selected {
    color: #000;
  }

  .Calendar__monthArrow {
    filter: invert(1);
  }

  .Calendar__monthYearContainer {
    filter: invert(1);
  }

  .Calendar__monthYear.-shown > *:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .Calendar__yearSelector,
  .Calendar__monthSelector {
    background-color: #0f0f0f;
    button {
      color: #fff;
    }
  }

  .Calendar__yearSelectorWrapper::before {
    background-image: linear-gradient(
      to top,
      #0f0f0f,
      #0f0f0f 10%,
      rgba(0, 0, 0, 0)
    );
  }
  .Calendar__yearSelectorWrapper::after {
    background-image: linear-gradient(
      to bottom,
      #0f0f0f,
      #0f0f0f 10%,
      rgba(0, 0, 0, 0)
    );
  }

  .Calendar__day {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const InputGroup = styled.div`
  width: 100%;
  justify-content: space-between;
  margin: 0 auto 1rem;
  max-width: 900px;
  padding: 2rem;
  font-size: 1.6rem;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    span {
      margin-right: 6px;
    }
  }

  [data-reach-slider-input] {
    width: 100%;
    margin-top: 1rem;
  }

  [data-reach-slider-range],
  [data-reach-slider-handle] {
    background-color: #ffe074 !important;
  }
`;

const countries = [
  { id: "gb", name: "United Kingdom" },
  { id: "us", name: "United States" },
  { id: "ire", name: "Ireland" },
  { id: "ja", name: "Jamaica" },
  { id: "se", name: "Sweden" },
];

const lifeExpectancies = {
  gb: 80,
  us: 78,
  ire: 100,
  ja: 74,
  se: 82,
  default: 80,
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  lifeExpectancy: number;
  setLifeExpectancy: (value: number) => void;
  dateOfBirth: string;
  setDateOfBirth: (value: string) => void;
  viewGrid: () => void;
}

export default function InputForm(props: Props) {
  const {
    lifeExpectancy,
    setLifeExpectancy,
    dateOfBirth,
    setDateOfBirth,
    viewGrid,
  } = props;

  const parsedDateOfBirth = new Date(dateOfBirth);
  const formtedDate = {
    year: parsedDateOfBirth.getFullYear(),
    month: parsedDateOfBirth.getMonth() + 1,
    day: parsedDateOfBirth.getDate(),
  };

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  useEffect(() => {
    setLifeExpectancy(
      lifeExpectancies[selectedCountry.id] || lifeExpectancies.default
    );
  }, [selectedCountry, setLifeExpectancy]);

  return (
    <Container>
      <InputGroup>
        <label>
          <span>When were you born?</span>
        </label>
        <Calendar
          value={formtedDate}
          onChange={(value) => {
            setDateOfBirth(
              new Date(
                `${value.year}-${value.month.toString().padStart(2, "0")}-${
                  value.day
                }`
              ).toString()
            );
          }}
        />

        <label>
          <Listbox value={selectedCountry} onChange={setSelectedCountry}>
            {({ open }) => (
              <>
                <Listbox.Label className="block">
                  Where are you from
                </Listbox.Label>
                <div className="mt-1 relative">
                  <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate text-black">
                      {selectedCountry.name}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {countries.map((person) => (
                        <Listbox.Option
                          key={person.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-white bg-indigo-600"
                                : "text-gray-900",
                              "cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          value={person}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {person.name}
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </label>

        <button
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={viewGrid}
        >
          Proceed
        </button>
      </InputGroup>
    </Container>
  );
}
