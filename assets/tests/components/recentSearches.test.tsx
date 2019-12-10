import { mount } from "enzyme"
import React from "react"
import renderer from "react-test-renderer"
import RecentSearches from "../../src/components/recentSearches"
import { setSearchText } from "../../src/state/searchPageState"

describe("RecentSearches", () => {
  test("renders empty state", () => {
    const tree = renderer
      .create(<RecentSearches savedQueries={[]} selectQuery={jest.fn()} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test("renders with data", () => {
    const tree = renderer
      .create(
        <RecentSearches
          savedQueries={[
            { text: "poodle" },
            { text: "999-502" },
            { text: "999-501" },
          ]}
          selectQuery={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test("clicking a recent searchPageState calls the callback function", () => {
    const selectQuery = jest.fn()
    const wrapper = mount(
      <RecentSearches
        savedQueries={[{ text: "poodle" }]}
        selectQuery={selectQuery}
      />
    )

    wrapper.find(".m-recent-searches__button").simulate("click")

    expect(selectQuery).toHaveBeenCalledWith(setSearchText("poodle"))
  })
})
