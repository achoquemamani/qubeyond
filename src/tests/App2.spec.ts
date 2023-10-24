import { mount } from '@vue/test-utils';
//import MainLayout from '../layouts/MainLayout.vue';

describe("App.vue", () => {
    test("setup correctlty", () => {
        expect(true).toBe(true);
    });

    /*test("displays message", () => {
      const wrapper = mount(MainLayout);
  
      // Assert the rendered text of the component
      expect(wrapper.text()).toContain('© 2023')
    });*/
})

/*
import { mount } from '@vue/test-utils'

// The component to test
const MessageComponent = {
  template: '<p>{{ msg }}</p>',
  props: ['msg']
}

test('displays message', () => {
  const wrapper = mount(MessageComponent, {
    props: {
      msg: 'Hello world'
    }
  })

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('Hello world')
})
*/