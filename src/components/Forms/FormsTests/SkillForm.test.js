import React, { useRef } from 'react';
import {render, screen} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import * as helper from '../../../Helpers/SkillHelper';
import SkillForm from '../SkillForm';

jest.mock('../../../Helpers/SkillHelper', () => ({
    GetAllSkills: jest.fn(),
    PostSkill: jest.fn(),
    GetSkill: jest.fn(),
    PutSkill: jest.fn(),
    DeleteSkill: jest.fn(),
}));

describe('SkillForm', () => {
    test('renders without crashing', () => {
            render(<SkillForm />);
            let ArchetypeElements = screen.getAllByText(/Skill Form/i)
            expect(ArchetypeElements.length).toBeGreaterThan(0);
        });
    test('renders the skill buttons ', async () => {
        helper.GetAllSkills.mockResolvedValue([
            { id: 1, name: 'Skill 1', description: 'Description 1' },
            { id: 2, name: 'Skill 2', description: 'Description 2' },
        ]);
        render(<SkillForm />);
        const listItems = await screen.findAllByRole('listitem');
        expect(listItems.length).toBe(2);
    }
    )
    test('modal is not open by default', () => {
        render(<SkillForm />);
        const modal = screen.queryByRole('dialog');
        expect(modal).not.toBeInTheDocument();
    })
    test('calls GetSkill with an ID when Skill Button Clicked ', async () => {
        helper.GetAllSkills.mockResolvedValue([
            { id: 1, name: 'Skill 1', description: 'Description 1' },
            { id: 2, name: 'Skill 2', description: 'Description 2' },
        ]);
        helper.GetSkill.mockResolvedValue({
            id: 1,
            name: 'Skill 1',
            description: 'Description 1',
            relatedAttribute: 1,
            skillType: 0,
        });
        render(<SkillForm />);
        const listItems = await screen.findAllByRole('listitem');
        const button = listItems[0].querySelector('button');
        button.click();
        expect(helper.GetSkill).toHaveBeenCalledWith(1);
    })
    test('Edit puts skill info in form', async () => {
        helper.GetAllSkills.mockResolvedValue([
            { id: 1, name: 'Skill 1', description: 'Description 1' },
            { id: 2, name: 'Skill 2', description: 'Description 2' },
        ]);
        helper.GetSkill.mockResolvedValue({
            id: 1,
            name: 'Skill 1',
            description: 'Description 1',
            relatedAttribute: 1,
            skillType: 0,
        });
        render(<SkillForm isOpen={true} />);
        const listItems = await screen.findAllByRole('listitem');
        const button = listItems[0].querySelector('button');
        button.click();
        let editButton = await screen.findByRole('button', { name: /Edit/i });
        editButton.click();
        let nameInput = await screen.findByLabelText('Skill Name');
        expect(nameInput.value).toBe('Skill 1');
    })

    test('Delete removes skill from list', async () => {
        helper.GetAllSkills.mockResolvedValue([
            { id: 1, name: 'Skill 1', description: 'Description 1' },
            { id: 2, name: 'Skill 2', description: 'Description 2' },
        ]);
        helper.DeleteSkill.mockResolvedValue(true);
        render(<SkillForm isOpen={true} />);
        const listItems = await screen.findAllByRole('listitem');
        const deleteButton = listItems[0].querySelector('button');
        deleteButton.click();
        expect(helper.DeleteSkill).toHaveBeenCalledWith(1);
    }
)
})