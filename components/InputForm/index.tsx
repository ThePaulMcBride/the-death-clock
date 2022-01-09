import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  SelectorIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";
import useLocalStorage from "@alexmarqs/react-use-local-storage";
import countriesData from "../../data/life_expectancy.json";

const sortedCountries = Object.values(countriesData).sort((a, b) => {
  if (a.country < b.country) return -1;
  if (a.country > b.country) return 1;
  return 0;
});

const Container = styled.div`
  width: 330px;
  max-width: 100%;

  .selected {
    background-color: #ffe074;
  }

  .date-input {
    background-color: #0f0f0f;
    color: white;
    border: 1px solid #0f0f0f;

    &::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }
  }

  .listbox-button {
    background-color: #0f0f0f;
    color: white;
    border: 1px solid #0f0f0f;
  }

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
  padding: 2rem 0;
  font-size: 1.6rem;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    span {
      margin-right: 6px;
    }
  }
`;

const Button = styled.button`
  background-color: #ffe074;
  display: flex;
  justify-content: space-between;
`;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const currentDate = new Date();
const maximumDate = {
  year: currentDate.getFullYear(),
  month: currentDate.getMonth() + 1,
  day: currentDate.getDate(),
};
interface Props {
  lifeExpectancy: number;
  setLifeExpectancy: (value: string) => void;
  dateOfBirth: string;
  setDateOfBirth: (value: string) => void;
  viewGrid: () => void;
}

export default function InputForm(props: Props) {
  const { setLifeExpectancy, dateOfBirth, setDateOfBirth, viewGrid } = props;

  const [selectedCountry, setSelectedCountry] = useLocalStorage(
    "country",
    countriesData["United Kingdom of Great Britain and Northern Ireland"]
  );

  useEffect(() => {
    setLifeExpectancy(`${selectedCountry.lifeExpectancy}`);
  }, [selectedCountry, setLifeExpectancy]);

  return (
    <Container>
      <InputGroup>
        <label htmlFor="date-of-birth">
          <span>When were you born?</span>
        </label>
        <input
          id="date-of-birth"
          type="date"
          value={dateOfBirth}
          max={new Date().toISOString().substring(0, 10)}
          className="mb-6 date-input w-full rounded-md shadow-sm pl-3 pr-3 py-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          onChange={(e) => setDateOfBirth(e.target.value)}
        />

        <label>
          <Listbox value={selectedCountry} onChange={setSelectedCountry}>
            {({ open }) => (
              <>
                <Listbox.Label className="block">
                  Where are you from?
                </Listbox.Label>
                <div className="mt-1 relative">
                  <Listbox.Button className="listbox-button relative w-full rounded-md shadow-sm pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm">
                    <span className="block truncate">
                      {selectedCountry.country}
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
                      {sortedCountries.map((country) => (
                        <Listbox.Option
                          key={country.country}
                          className={({ active }) =>
                            classNames(
                              active ? "text-black selected" : "text-gray-900",
                              "cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          value={country}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {country.country}
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

        <Button
          className="inline-flex items-center px-4 py-3 border border-transparent text-lg leading-4 font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 text-black focus:ring-yellow-500 w-full mt-8"
          onClick={viewGrid}
        >
          Proceed
          <ChevronRightIcon className="w-6" />
        </Button>
      </InputGroup>
    </Container>
  );
}
