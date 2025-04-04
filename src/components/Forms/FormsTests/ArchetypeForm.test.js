import React, { useRef } from 'react';
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
    
    test('calls GetArchetype with an ID when Archetype Button Clicked ', async () => {
        helper.GetAllArchetypes.mockResolvedValue([
            { id: 1, name: 'Archetype 1', description: 'Description 1' },
            { id: 2, name: 'Archetype 2', description: 'Description 2' },
        ]);
        helper.GetArchetype.mockResolvedValue({
            id: 1,
            name: 'Archetype 1',
            description: 'Description 1',
            attributes: [],
        });

        render(<ArchetypeForm />);
        const listItems = await screen.findAllByRole('listitem');
        const button = listItems[0].querySelector('button');
        button.click();
        expect(helper.GetArchetype).toHaveBeenCalledWith(1);
    })

    test('Edit puts archetype info in form', async () => {
        helper.GetAllArchetypes.mockResolvedValue([
            { id: 1, name: 'Archetype 1', description: 'Description 1' },
            { id: 2, name: 'Archetype 2', description: 'Description 2' },
        ]);
        helper.GetArchetype.mockResolvedValue({
            id: 1,
            name: 'Archetype 1',
            description: 'Description 1',
            attributes: [],
        });

        render(<ArchetypeForm isOpen={true}/>);
        const listItems = await screen.findAllByRole('listitem');
        const button = listItems[0].querySelector('button');
        button.click();

        let editButton = await screen.findByRole('button', { name: /Edit/i });
        editButton.click();
        let nameInput = await screen.findByLabelText('Archetype Name');
        expect(nameInput).toHaveValue('Archetype 1');
    })

    test('Delete removes archetype from list', async () => {
        helper.GetAllArchetypes.mockResolvedValue([
            { id: 1, name: 'Archetype 1', description: 'Description 1' },
            { id: 2, name: 'Archetype 2', description: 'Description 2' },
        ]);
        helper.DeleteArchetype.mockResolvedValue(true);

        render(<ArchetypeForm isOpen={true}/>);
        let listItems = await screen.findAllByRole('listitem');
        const button = listItems[0].querySelector('button');
        button.click();

        let deleteButton = await screen.findByRole('button', { name: /Delete/i });
        deleteButton.click();
        expect(helper.DeleteArchetype).toHaveBeenCalledWith(1);
        
    })
    

});