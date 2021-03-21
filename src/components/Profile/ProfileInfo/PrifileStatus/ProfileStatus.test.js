import React from "react";
import {create} from "react-test-renderer"
import ProfileStatus from "./PrifileStatus";

describe("ProfileStatus component", () => {
	test("status from props should be in the state", ()=>{
		const component = create(<ProfileStatus status="new status"/>);
		const instance = component.getInstance();
		expect(instance.state.status).toBe("new status");
	});
	test("after creation <span> with status should be display", ()=>{
		const component = create(<ProfileStatus status="new status"/>);
		const root = component.root;
		let span = root.findByType("span");
		expect(span.length).not.toBeNull();
	});
	test("after creation <span> with status should be display with correct status", ()=>{
		const component = create(<ProfileStatus status="new status"/>);
		const root = component.root;
		let span = root.findByType("span");
		expect(span.children[0]).toBe("new status");
	});
	test("after creation <input> shouldn't be displayed", ()=>{
		const component = create(<ProfileStatus status="new status"/>);
		const root = component.root;
		expect( ()=> root.findByType("input")).toThrow();
	});
	test("change edit mode (<input> should be display)", ()=>{
		const component = create(<ProfileStatus status="new status"/>);
		const root = component.root;
		let span = root.findByType("span");
		span.props.onDoubleClick();
		let input = root.findByType("input");
		expect(input.props.value).toBe("new status");
	});
	test("callback should be called", ()=>{
		const mockCallback = jest.fn();
		const component = create(<ProfileStatus status="new status" statusUpdateThunk={mockCallback}/>);
		const instance = component.getInstance();
		instance.deactivateEditMode();
		expect(mockCallback.mock.calls.length).toBe(1);
	});
});