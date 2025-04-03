import React from 'react';
import {render, screen} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import ArchetypeForm from '../ArchetypeForm';
import * as helper from '../../../Helpers/ArchetypeHelper';

jest.mock('../../../Helpers/ArchetypeHelper', () => ({
    GetAllArchetypes: jest.fn(),
    PostArchetype: jest.fn(),
    GetArchetype: jest.fn(),
    PutArchetype: jest.fn(),
    DeleteArchetype: jest.fn(),
}));


describe('ArchetypeForm', () => {
    test('renders without crashing', () => {
        render(<ArchetypeForm />);
        let ArchetypeElements = screen.getAllByText(/Archetype Form/i)
        expect(ArchetypeElements.length).toBeGreaterThan(0);
    });
    
    test('renders the archetype buttons ', async () => {
        helper.GetAllArchetypes.mockResolvedValue([
            { id: 1, name: 'Archetype 1', description: 'Description 1' },
            { id: 2, name: 'Archetype 2', description: 'Description 2' },
        ]);
        render(<ArchetypeForm />);
        const listItems = await screen.findAllByRole('listitem');
        expect(listItems.length).toBe(2);
    })

    test('modal is not open by default', () => {
        render(<ArchetypeForm />);
        const modal = screen.queryByRole('dialog');
        expect(modal).not.toBeInTheDocument();
    })
    
    test('renders the modal when archetype-clicked ', async () => {
        helper.GetAllArchetypes.mockResolvedValue([
            { id: 1, name: 'Archetype 1', description: 'Description 1' },
            { id: 2, name: 'Archetype 2', description: 'Description 2' },
        ]);

        render(<ArchetypeForm />);
        const listItems = await screen.findAllByRole('listitem');
        const button = listItems[0].querySelector('button');
        button.click();
        expect(helper.GetArchetype).toHaveBeenCalledWith(1);
    })
    
});